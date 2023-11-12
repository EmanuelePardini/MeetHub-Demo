<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Illuminate\Validation\ValidationException;
use Carbon\Carbon;
use App\Models\Event;
use App\Models\User;


class EventController extends Controller
{
    public function index()
    {
        // Restituisce tutti gli eventi con informazioni su utente creatore e categoria
        $events = Event::with('creator', 'category')
            ->withCount('participants')
            ->get();
        return $events;
    }

    public function userEvents(Request $request, $user_id)
    {
        // Ora puoi recuperare gli eventi dell'utente specificato dal database
        $user = User::with(['events.creator', 'events.category', 'events.participants'])
            ->find($user_id);
    
        // Ottieni solo gli eventi senza la tabella pivot
        $userEvents = $user->events->map(function ($event) {
            // Aggiungi il conteggio dei partecipanti a ciascun evento
            $eventArray = $event->toArray();
            $eventArray['participants_count'] = $event->participants->count();
            return $eventArray;
        });
    
        return response()->json($userEvents, 200);
    }
    
    public function store(Request $request, $user_id)
    {
        try{
        // Validazione dei dati dell'evento
        $request->validate([
            'title' => 'required|string|max:100',
            'image' => 'nullable|string',
            'description' => 'nullable|string|max:128',
            'date' => 'required|date',
            'time_start' => 'required|date_format:H:i',
            'time_end' => 'required|date_format:H:i|after:time_start',
            'location' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);
        
        // Ottieni l'utente dal modello User
        $user = User::find($user_id);

        $event = new Event($request->all());
        $event->creator()->associate($user_id);
        $event->save();

        $user->events()->save($event);
    
        return response()->json($event, 201);
    } catch (ValidationException $e) {
        // Restituisci gli errori di validazione
        return response()->json(['errors' => $e->errors()], 422);
    } catch (\Exception $e) {

        // Ritorna una risposta di errore generica
        return response()->json(['message' => 'Errore durante la creazione dell\'evento.'], 500);
    }
    }

    public function subscribe(User $user, Event $event)
    {
        // Verifica se l'utente è già iscritto all'evento
        if (!$user->events->contains($event)) {
            // Se non è già iscritto, procedi con l'iscrizione
            $user->events()->attach($event);

            return response()->json(['message' => 'Iscrizione avvenuta con successo'], 200);
        }

        return response()->json(['message' => 'L\'utente è già iscritto all\'evento'], 422);
    }

    public function unsubscribe(User $user, Event $event)
    {
        // Verifica se l'utente è iscritto all'evento
        if ($user->events->contains($event)) {
            // Se è iscritto, procedi con la disiscrizione
            $user->events()->detach($event);

            return response()->json(['message' => 'Disiscrizione avvenuta con successo'], 200);
        }

        return response()->json(['message' => 'L\'utente non è iscritto all\'evento'], 422);
    }
public function destroy(Event $event)
{

    // Elimina i record correlati nella tabella pivot "event_user"
    $event->participants()->detach();

    // Elimina i record correlati nella tabella "threads"
    $event->threads()->delete();

    // Infine, elimina l'evento
    $event->delete();

    return response()->json(['message' => 'Event deleted successfully'], 200);

}

// app/Http/Controllers/EventController.php
public function getFilteredEvents(Request $request)
{
    $query = Event::query();

    // Verifica e applica filtri
    if ($request->filled('title')) {
        $query->where('title', 'like', '%' . $request->input('title') . '%');
    }

    if ($request->filled('location')) {
        $query->where('location', 'like', '%' . $request->input('location') . '%');
    }

    if ($request->input('category') != 1 && $request->input('category') != 0) //ID 1 è Blank
     {
        $query->where('category_id', $request->input('category'));
    }

    if ($request->filled('organizer')) {
        $searchTerm = $request->input('organizer');
        
        $query->whereHas('creator', function ($q) use ($searchTerm) {
            $q->where(function ($innerQuery) use ($searchTerm) {
                $innerQuery->where('name', 'like', '%' . $searchTerm . '%')
                            ->orWhere('surname', 'like', '%' . $searchTerm . '%');
            });
        });
    }
    
    if ($request->filled('minParticipants')) {
        $query->withCount(['participants as participants_count'])
              ->having('participants_count', '>=', $request->input('minParticipants'));
    }
    
    if ($request->filled('maxParticipants')) {
        $query->withCount(['participants as participants_count'])
              ->having('participants_count', '<=', $request->input('maxParticipants'));
    }
    if ($request->filled('date')) {
        $query->whereDate('date', $request->input('date'));
    }

    if ($request->filled('time')) {
        $time = Carbon::parse($request->input('time'));
        $query->whereTime('time_start', '<=', $time->format('H:i'))
              ->whereTime('time_end', '>=', $time->format('H:i'));
    }
    

    $filteredEvents = $query->with('creator', 'category')
    ->withCount('participants')
    ->get();

    return response()->json($filteredEvents);
}




}
