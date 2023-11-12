<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\CategoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//EVENTS
Route::get('/events', [EventController::class, 'index']); 
Route::post('/events/{userId}', [EventController::class, 'store']);  
Route::get('/user-events/{userId}', [EventController::class, 'userEvents']);
Route::get('/events/filtered', [EventController::class, 'getFilteredEvents']);
Route::post('/subscribe/{user}/{event}', [EventController::class, 'subscribe']);
Route::delete('/unsubscribe/{user}/{event}', [EventController::class, 'unsubscribe']);
Route::delete('/events/{event}', [EventController::class, 'destroy']);

//USERS
Route::get('/users', [UserController::class, 'index']);

Route::get('/is-subscribed/{userId}/{eventId}', [UserController::class, 'isSubscribed']);

//AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//THREADS
Route::get('/threads/{eventId}', [ThreadController::class, 'index']);
Route::post('/threads/send/{eventId}/{userId}', [ThreadController::class, 'store']);

//CATEGORIES
Route::get('/categories', [CategoryController::class, 'index']);