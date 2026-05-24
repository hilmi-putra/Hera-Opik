<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rsvp extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'guest_name',
        'attendance_status',
        'events',
        'total_attendees',
        'notes',
        'phone_number',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'events' => 'array',
        'total_attendees' => 'integer',
    ];

    /**
     * Scope for attending guests.
     */
    public function scopeAttending($query)
    {
        return $query->where('attendance_status', 'attending');
    }

    /**
     * Scope for not attending guests.
     */
    public function scopeNotAttending($query)
    {
        return $query->where('attendance_status', 'not_attending');
    }

    /**
     * Scope for searching by guest name.
     */
    public function scopeSearch($query, ?string $search)
    {
        if ($search) {
            return $query->where('guest_name', 'like', "%{$search}%");
        }
        return $query;
    }
}
