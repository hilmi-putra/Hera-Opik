<?php

namespace App\Services;

use App\Models\Rsvp;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class RsvpService
{
    /**
     * Get paginated RSVP list with filters.
     */
    public function getPaginated(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Rsvp::query()->latest();

        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (!empty($filters['status'])) {
            $query->where('attendance_status', $filters['status']);
        }

        if (!empty($filters['event'])) {
            $query->whereJsonContains('events', $filters['event']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get dashboard statistics.
     */
    public function getStatistics(): array
    {
        $total = Rsvp::count();
        $attending = Rsvp::attending()->count();
        $notAttending = Rsvp::notAttending()->count();
        $totalGuests = Rsvp::attending()->sum('total_attendees');

        return [
            'total_submissions' => $total,
            'total_attending' => $attending,
            'total_not_attending' => $notAttending,
            'total_guests' => $totalGuests,
        ];
    }

    /**
     * Create a new RSVP entry.
     */
    public function create(array $data): Rsvp
    {
        return Rsvp::create($data);
    }

    /**
     * Update an existing RSVP entry.
     */
    public function update(Rsvp $rsvp, array $data): Rsvp
    {
        $rsvp->update($data);
        return $rsvp->fresh();
    }

    /**
     * Delete an RSVP entry.
     */
    public function delete(Rsvp $rsvp): bool
    {
        return $rsvp->delete();
    }

    /**
     * Find RSVP by ID.
     */
    public function findOrFail(int $id): Rsvp
    {
        return Rsvp::findOrFail($id);
    }

    /**
     * Get recent RSVPs for dashboard.
     */
    public function getRecent(int $limit = 5): Collection
    {
        return Rsvp::latest()->limit($limit)->get();
    }

    /**
     * Get RSVP entries with wishes/notes for the marquee section.
     */
    public function getWishes(): Collection
    {
        return Rsvp::whereNotNull('notes')
            ->where('notes', '!=', '')
            ->latest()
            ->get();
    }
}
