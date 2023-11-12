<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ThreadController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//EVENTS
Route::get('/events', [EventController::class, 'index']); // GET /events
Route::post('/events', [EventController::class, 'store']); // POST /events
Route::get('/events/{id}', [EventController::class, 'show']); // GET /events/{id}
Route::put('/events/{id}', [EventController::class, 'update']); // PUT /events/{id}
Route::delete('/events/{id}', [EventController::class, 'destroy']); // DELETE /events/{id}

//USERS
Route::get('/users', [UserController::class, 'index']); // GET /users
// Aggiungi altre route per le operazioni CRUD sugli utenti se necessario

//REVIEWS
Route::post('/events/{eventId}/reviews', [ReviewController::class, 'store']);

//THREADS
Route::post('/events/{eventId}/threads', [ThreadController::class, 'store']);


