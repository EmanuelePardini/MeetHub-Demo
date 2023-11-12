<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; // Assicurati di importare correttamente il modello User
use App\Models\Event;

class UserController extends Controller
{
    public function index()
    {
        // Restituisce tutti gli utenti
        return User::all();
    }

    public function isSubscribed($userId, $eventId)
    {
        // Verifica se l'utente è iscritto all'evento
        $isSubscribed = Event::find($eventId)->participants->contains('id', $userId);

        return response()->json(['is_subscribed' => $isSubscribed]);
    }
    
    
}