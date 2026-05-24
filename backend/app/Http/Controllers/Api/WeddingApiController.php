<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRsvpRequest;
use App\Http\Requests\ClaimGiftRequest;
use App\Services\RsvpService;
use App\Services\GiftRecommendationService;
use App\Models\GiftRecommendation;
use Illuminate\Http\JsonResponse;

class WeddingApiController extends Controller
{
    public function __construct(
        protected RsvpService $rsvpService,
        protected GiftRecommendationService $giftService
    ) {}

    /**
     * Submit an RSVP from the frontend.
     */
    public function submitRsvp(StoreRsvpRequest $request): JsonResponse
    {
        $rsvp = $this->rsvpService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'RSVP berhasil dikirim. Terima kasih!',
            'data' => $rsvp,
        ], 201);
    }

    /**
     * Get all gift recommendations for the frontend, including sold out items.
     */
    public function getGifts(): JsonResponse
    {
        $gifts = $this->giftService->getAvailableForFrontend();

        return response()->json([
            'success' => true,
            'data' => $gifts->map(function ($gift) {
                return [
                    'id' => $gift->id,
                    'name' => $gift->product_name,
                    'description' => $gift->description,
                    'price' => (float) $gift->price,
                    'totalStock' => $gift->total_stock,
                    'purchasedCount' => $gift->purchased_count,
                    'image' => $gift->image ? asset('storage/' . $gift->image) : null,
                    'color' => $gift->color,
                    'link' => $gift->purchase_link,
                ];
            }),
        ]);
    }

    /**
     * Claim a gift from the frontend.
     */
    public function claimGift(ClaimGiftRequest $request, GiftRecommendation $gift): JsonResponse
    {
        try {
            $gift = $this->giftService->claimGift($gift, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Konfirmasi pembelian berhasil!',
                'data' => $gift,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Get wedding wishes/messages for the marquee section.
     */
    public function getWishes(): JsonResponse
    {
        $wishes = $this->rsvpService->getWishes();

        return response()->json([
            'success' => true,
            'data' => $wishes->map(fn ($rsvp) => [
                'id' => $rsvp->id,
                'name' => $rsvp->guest_name,
                'message' => $rsvp->notes,
                'status' => $rsvp->attendance_status,
                'date' => $rsvp->created_at->format('d M Y'),
            ]),
        ]);
    }
}
