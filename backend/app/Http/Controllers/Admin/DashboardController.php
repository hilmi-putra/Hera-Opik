<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RsvpService;
use App\Services\GiftRecommendationService;

class DashboardController extends Controller
{
    public function __construct(
        protected RsvpService $rsvpService,
        protected GiftRecommendationService $giftService
    ) {}

    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $rsvpStats = $this->rsvpService->getStatistics();
        $giftStats = $this->giftService->getStatistics();
        $recentRsvps = $this->rsvpService->getPaginated([], 5);

        return view('admin.dashboard', compact('rsvpStats', 'giftStats', 'recentRsvps'));
    }
}
