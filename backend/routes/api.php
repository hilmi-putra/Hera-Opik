<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeddingApiController;

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
});
