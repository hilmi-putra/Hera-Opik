<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftRecommendation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'product_name',
        'image',
        'description',
        'purchase_link',
        'price',
        'color',
        'total_stock',
        'purchased_count',
        'is_claimed',
        'claimed_by',
        'claimed_phone',
        'claimed_email',
        'availability_status',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'price' => 'decimal:2',
        'total_stock' => 'integer',
        'purchased_count' => 'integer',
        'is_claimed' => 'boolean',
    ];

    /**
     * Get remaining stock.
     */
    public function getRemainingStockAttribute(): int
    {
        return max(0, $this->total_stock - $this->purchased_count);
    }

    /**
     * Check if the gift is still available for claiming.
     */
    public function getIsAvailableAttribute(): bool
    {
        return $this->remaining_stock > 0 && $this->availability_status !== 'fully_claimed';
    }

    /**
     * Scope for available gifts.
     */
    public function scopeAvailable($query)
    {
        return $query->where('availability_status', '!=', 'fully_claimed');
    }

    /**
     * Scope for searching by product name.
     */
    public function scopeSearch($query, ?string $search)
    {
        if ($search) {
            return $query->where('product_name', 'like', "%{$search}%");
        }
        return $query;
    }

    /**
     * Update availability status based on stock.
     */
    public function updateAvailabilityStatus(): void
    {
        if ($this->purchased_count >= $this->total_stock) {
            $this->availability_status = 'fully_claimed';
            $this->is_claimed = true;
        } elseif ($this->purchased_count > 0) {
            $this->availability_status = 'partially_claimed';
        } else {
            $this->availability_status = 'available';
            $this->is_claimed = false;
        }
        $this->save();
    }
}
