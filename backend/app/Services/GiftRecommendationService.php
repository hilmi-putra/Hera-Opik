<?php

namespace App\Services;

use App\Models\GiftRecommendation;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class GiftRecommendationService
{
    /**
     * Get paginated gift recommendations with filters.
     */
    public function getPaginated(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = GiftRecommendation::query()->latest();

        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (!empty($filters['status'])) {
            $query->where('availability_status', $filters['status']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get dashboard statistics.
     */
    public function getStatistics(): array
    {
        $total = GiftRecommendation::count();
        $available = GiftRecommendation::where('availability_status', 'available')->count();
        $partiallyClaimed = GiftRecommendation::where('availability_status', 'partially_claimed')->count();
        $fullyClaimed = GiftRecommendation::where('availability_status', 'fully_claimed')->count();
        $totalValue = GiftRecommendation::sum('price');

        return [
            'total_gifts' => $total,
            'available' => $available,
            'partially_claimed' => $partiallyClaimed,
            'fully_claimed' => $fullyClaimed,
            'total_value' => $totalValue,
        ];
    }

    /**
     * Create a new gift recommendation.
     */
    public function create(array $data): GiftRecommendation
    {
        if (isset($data['image']) && $data['image']) {
            $data['image'] = $data['image']->store('gifts', 'public');
        }

        return GiftRecommendation::create($data);
    }

    /**
     * Update an existing gift recommendation.
     */
    public function update(GiftRecommendation $gift, array $data): GiftRecommendation
    {
        if (isset($data['image']) && $data['image']) {
            // Delete old image if exists
            if ($gift->image) {
                Storage::disk('public')->delete($gift->image);
            }
            $data['image'] = $data['image']->store('gifts', 'public');
        }

        $gift->update($data);
        return $gift->fresh();
    }

    /**
     * Delete a gift recommendation.
     */
    public function delete(GiftRecommendation $gift): bool
    {
        if ($gift->image) {
            Storage::disk('public')->delete($gift->image);
        }
        return $gift->delete();
    }

    /**
     * Claim a gift.
     */
    public function claimGift(GiftRecommendation $gift, array $claimData): GiftRecommendation
    {
        if ($gift->availability_status === 'fully_claimed') {
            throw new \Exception('This gift has already been fully claimed.');
        }

        $quantity = $claimData['quantity'] ?? 1;
        $newPurchasedCount = $gift->purchased_count + $quantity;

        if ($newPurchasedCount > $gift->total_stock) {
            throw new \Exception('Requested quantity exceeds available stock.');
        }

        $gift->purchased_count = $newPurchasedCount;
        $gift->claimed_by = $claimData['claimed_by'] ?? $gift->claimed_by;
        $gift->claimed_phone = $claimData['claimed_phone'] ?? $gift->claimed_phone;
        $gift->claimed_email = $claimData['claimed_email'] ?? $gift->claimed_email;

        $gift->save();
        $gift->updateAvailabilityStatus();

        return $gift->fresh();
    }

    /**
     * Get all gifts for frontend, including fully claimed items so they can
     * remain visible as sold out.
     */
    public function getAvailableForFrontend(): Collection
    {
        return GiftRecommendation::query()
            ->select(['id', 'product_name', 'image', 'description', 'purchase_link', 'price', 'color', 'total_stock', 'purchased_count', 'availability_status'])
            ->latest()
            ->get();
    }

    /**
     * Find gift by ID.
     */
    public function findOrFail(int $id): GiftRecommendation
    {
        return GiftRecommendation::findOrFail($id);
    }
}
