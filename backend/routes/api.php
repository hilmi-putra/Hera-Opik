<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeddingApiController;
use App\Http\Controllers\Api\AdminApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->name('api.v1.')->group(function () {
    // RSVP submission endpoint
    Route::post('/rsvp', [WeddingApiController::class, 'submitRsvp'])->name('rsvp.submit');

    // Wedding wishes for marquee
    Route::get('/wishes', [WeddingApiController::class, 'getWishes'])->name('wishes.index');

    // Gift recommendations
    Route::get('/gifts', [WeddingApiController::class, 'getGifts'])->name('gifts.index');
    Route::post('/gifts/{gift}/claim', [WeddingApiController::class, 'claimGift'])->name('gifts.claim');

    // React admin API powered by Laravel + MySQL
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::post('/login', [AdminApiController::class, 'login'])->name('login');
        Route::get('/me', [AdminApiController::class, 'me'])->name('me');
        Route::post('/logout', [AdminApiController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [AdminApiController::class, 'dashboard'])->name('dashboard');
        Route::get('/rsvps', [AdminApiController::class, 'rsvps'])->name('rsvps');
        Route::post('/rsvps', [AdminApiController::class, 'storeRsvp'])->name('rsvps.store');
        Route::put('/rsvps/{rsvp}', [AdminApiController::class, 'updateRsvp'])->name('rsvps.update');
        Route::delete('/rsvps/{rsvp}', [AdminApiController::class, 'destroyRsvp'])->name('rsvps.destroy');
        Route::get('/wishes', [AdminApiController::class, 'wishes'])->name('wishes');
        Route::post('/wishes', [AdminApiController::class, 'storeWish'])->name('wishes.store');
        Route::put('/wishes/{rsvp}', [AdminApiController::class, 'updateWish'])->name('wishes.update');
        Route::delete('/wishes/{rsvp}', [AdminApiController::class, 'destroyWish'])->name('wishes.destroy');
        Route::get('/gifts', [AdminApiController::class, 'gifts'])->name('gifts');
        Route::post('/gifts', [AdminApiController::class, 'storeGift'])->name('gifts.store');
        Route::put('/gifts/{gift}', [AdminApiController::class, 'updateGift'])->name('gifts.update');
        Route::delete('/gifts/{gift}', [AdminApiController::class, 'destroyGift'])->name('gifts.destroy');
        Route::get('/events', [AdminApiController::class, 'events'])->name('events');
        Route::get('/gallery', [AdminApiController::class, 'gallery'])->name('gallery');
        Route::get('/config', [AdminApiController::class, 'config'])->name('config');
        Route::put('/config', [AdminApiController::class, 'updateConfig'])->name('config.update');
    });
});
