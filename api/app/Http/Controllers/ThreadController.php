<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Thread;

class ThreadController extends Controller
{

    public function index($eventId)
    {
        $threads = Thread::where('event_id', $eventId)
            ->with('user')
            ->get();

        return response()->json($threads);
    }

    public function store($eventId, $userId, Request $request)
    {
        // Esegui la validazione dei dati del messaggio se necessario

        // Crea e salva il nuovo messaggio
        $message = new Thread();
        $message->event_id = $eventId;
        $message->user_id = $userId;
        $message->message = $request->input('message');
        $message->save();

        // Puoi restituire il messaggio appena creato se necessario
        return response()->json($message);
    }
}
