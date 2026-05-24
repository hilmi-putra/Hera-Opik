<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGiftRequest;
use App\Http\Requests\UpdateGiftRequest;
use App\Services\GiftRecommendationService;
use App\Models\GiftRecommendation;
use Illuminate\Http\Request;

class GiftRecommendationController extends Controller
{
    public function __construct(
        protected GiftRecommendationService $giftService
    ) {}

    /**
     * Display a listing of gift recommendations.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status']);
        $gifts = $this->giftService->getPaginated($filters);
        $stats = $this->giftService->getStatistics();

        return view('admin.gifts.index', compact('gifts', 'stats', 'filters'));
    }

    /**
     * Show the form for creating a new gift recommendation.
     */
    public function create()
    {
        return view('admin.gifts.create');
    }

    /**
     * Store a newly created gift recommendation in storage.
     */
    public function store(StoreGiftRequest $request)
    {
        $data = $request->validated();
        $this->giftService->create($data);

        return redirect()->route('admin.gifts.index')
            ->with('success', 'Rekomendasi hadiah berhasil ditambahkan.');
    }

    /**
     * Display the specified gift recommendation.
     */
    public function show(GiftRecommendation $gift)
    {
        return view('admin.gifts.show', compact('gift'));
    }

    /**
     * Show the form for editing the specified gift recommendation.
     */
    public function edit(GiftRecommendation $gift)
    {
        return view('admin.gifts.edit', compact('gift'));
    }

    /**
     * Update the specified gift recommendation in storage.
     */
    public function update(UpdateGiftRequest $request, GiftRecommendation $gift)
    {
        $data = $request->validated();
        $this->giftService->update($gift, $data);

        return redirect()->route('admin.gifts.index')
            ->with('success', 'Rekomendasi hadiah berhasil diperbarui.');
    }

    /**
     * Remove the specified gift recommendation from storage.
     */
    public function destroy(GiftRecommendation $gift)
    {
        $this->giftService->delete($gift);

        return redirect()->route('admin.gifts.index')
            ->with('success', 'Rekomendasi hadiah berhasil dihapus.');
    }
}
