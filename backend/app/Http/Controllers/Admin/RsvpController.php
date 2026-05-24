<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRsvpRequest;
use App\Http\Requests\UpdateRsvpRequest;
use App\Services\RsvpService;
use App\Models\Rsvp;
use Illuminate\Http\Request;

class RsvpController extends Controller
{
    public function __construct(
        protected RsvpService $rsvpService
    ) {}

    /**
     * Display a listing of the RSVP entries.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status', 'event']);
        $rsvps = $this->rsvpService->getPaginated($filters);
        $stats = $this->rsvpService->getStatistics();

        return view('admin.rsvp.index', compact('rsvps', 'stats', 'filters'));
    }

    /**
     * Show the form for creating a new RSVP.
     */
    public function create()
    {
        return view('admin.rsvp.create');
    }

    /**
     * Store a newly created RSVP in storage.
     */
    public function store(StoreRsvpRequest $request)
    {
        $this->rsvpService->create($request->validated());

        return redirect()->route('admin.rsvp.index')
            ->with('success', 'RSVP berhasil ditambahkan.');
    }

    /**
     * Display the specified RSVP.
     */
    public function show(Rsvp $rsvp)
    {
        return view('admin.rsvp.show', compact('rsvp'));
    }

    /**
     * Show the form for editing the specified RSVP.
     */
    public function edit(Rsvp $rsvp)
    {
        return view('admin.rsvp.edit', compact('rsvp'));
    }

    /**
     * Update the specified RSVP in storage.
     */
    public function update(UpdateRsvpRequest $request, Rsvp $rsvp)
    {
        $this->rsvpService->update($rsvp, $request->validated());

        return redirect()->route('admin.rsvp.index')
            ->with('success', 'RSVP berhasil diperbarui.');
    }

    /**
     * Remove the specified RSVP from storage.
     */
    public function destroy(Rsvp $rsvp)
    {
        $this->rsvpService->delete($rsvp);

        return redirect()->route('admin.rsvp.index')
            ->with('success', 'RSVP berhasil dihapus.');
    }
}
