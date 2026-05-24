<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GiftRecommendation;
use App\Models\Rsvp;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminApiController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password tidak valid.',
            ], 422);
        }

        $plainToken = Str::random(80);
        $user->forceFill([
            'api_token' => hash('sha256', $plainToken),
        ])->save();

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $plainToken,
                'user' => $this->serializeUser($user),
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->serializeUser($this->user($request)),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->user($request)->forceFill(['api_token' => null])->save();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.',
        ]);
    }

    public function dashboard(Request $request): JsonResponse
    {
        $this->user($request);

        $rsvps = Rsvp::latest()->limit(50)->get();
        $wishes = Rsvp::whereNotNull('notes')->where('notes', '!=', '')->latest()->limit(50)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'rsvpsCount' => Rsvp::count(),
                    'wishesCount' => Rsvp::whereNotNull('notes')->where('notes', '!=', '')->count(),
                    'eventsCount' => count($this->eventsPayload()),
                    'giftsCount' => GiftRecommendation::count(),
                ],
                'recentRsvps' => $rsvps->map(fn (Rsvp $rsvp) => $this->serializeRsvp($rsvp))->values(),
                'recentWishes' => $wishes->map(fn (Rsvp $rsvp) => $this->serializeWish($rsvp))->values(),
            ],
        ]);
    }

    public function rsvps(Request $request): JsonResponse
    {
        $this->user($request);

        return response()->json([
            'success' => true,
            'data' => Rsvp::latest()->get()->map(fn (Rsvp $rsvp) => $this->serializeRsvp($rsvp))->values(),
        ]);
    }

    public function wishes(Request $request): JsonResponse
    {
        $this->user($request);

        return response()->json([
            'success' => true,
            'data' => Rsvp::whereNotNull('notes')
                ->where('notes', '!=', '')
                ->latest()
                ->get()
                ->map(fn (Rsvp $rsvp) => $this->serializeWish($rsvp))
                ->values(),
        ]);
    }

    public function gifts(Request $request): JsonResponse
    {
        $this->user($request);

        return response()->json([
            'success' => true,
            'data' => GiftRecommendation::latest()->get()->map(fn (GiftRecommendation $gift) => [
                'id' => $gift->id,
                'product_name' => $gift->product_name,
                'description' => $gift->description,
                'price' => (float) $gift->price,
                'color' => $gift->color,
                'total_stock' => $gift->total_stock,
                'purchased_count' => $gift->purchased_count,
                'availability_status' => $gift->availability_status,
                'claimed_by' => $gift->claimed_by,
                'created_at' => $gift->created_at?->toISOString(),
            ])->values(),
        ]);
    }

    public function events(Request $request): JsonResponse
    {
        $this->user($request);

        return response()->json([
            'success' => true,
            'data' => $this->eventsPayload(),
        ]);
    }

    public function gallery(Request $request): JsonResponse
    {
        $this->user($request);

        $frontendUrl = rtrim((string) config('services.frontend.url', env('FRONTEND_URL', 'http://localhost:5173')), '/');
        $images = [
            'CMZ_3989.jpg',
            'CMZ_4003.jpg',
            'CMZ_4028.jpg',
            'CMZ_4050.jpg',
            'CMZ_4051.jpg',
            'CMZ_4069.jpg',
            'CMZ_4130.jpg',
            'CMZ_4152.jpg',
            'CMZ_4315.jpg',
            'CMZ_4354.jpg',
        ];

        return response()->json([
            'success' => true,
            'data' => collect($images)->map(fn (string $image, int $index) => [
                'id' => $index + 1,
                'media_url' => "{$frontendUrl}/Gallery/{$image}",
                'media_type' => 'image',
                'caption_id' => 'Portrait ' . ($index + 1),
                'is_active' => true,
                'sort_order' => $index + 1,
                'created_at' => now()->toISOString(),
            ])->values(),
        ]);
    }

    public function config(Request $request): JsonResponse
    {
        $this->user($request);

        return response()->json([
            'success' => true,
            'data' => $this->configPayload(),
        ]);
    }

    public function updateConfig(Request $request): JsonResponse
    {
        $this->user($request);

        $data = $request->validate([
            'groom_name' => ['required', 'string', 'max:255'],
            'bride_name' => ['required', 'string', 'max:255'],
            'groom_nickname' => ['nullable', 'string', 'max:100'],
            'bride_nickname' => ['nullable', 'string', 'max:100'],
            'wedding_date' => ['required', 'date'],
            'hero_image_url' => ['nullable', 'string'],
            'story_text_en' => ['nullable', 'string'],
            'story_text_id' => ['nullable', 'string'],
            'timezone' => ['required', 'string', 'max:50'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Konfigurasi diterima oleh API Laravel.',
            'data' => $data,
        ]);
    }

    private function user(Request $request): User
    {
        $token = $request->bearerToken();

        abort_if(!$token, 401, 'Unauthenticated.');

        $user = User::where('api_token', hash('sha256', $token))->first();

        abort_if(!$user, 401, 'Unauthenticated.');

        return $user;
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => 'admin',
        ];
    }

    private function serializeRsvp(Rsvp $rsvp): array
    {
        return [
            'id' => $rsvp->id,
            'guest_name' => $rsvp->guest_name,
            'phone_number' => $rsvp->phone_number,
            'attendance_status' => $rsvp->attendance_status,
            'events' => $rsvp->events,
            'total_attendees' => $rsvp->total_attendees,
            'notes' => $rsvp->notes,
            'created_at' => $rsvp->created_at?->toISOString(),
        ];
    }

    private function serializeWish(Rsvp $rsvp): array
    {
        return [
            'id' => $rsvp->id,
            'guest_name' => $rsvp->guest_name,
            'message' => $rsvp->notes,
            'attendance_status' => $rsvp->attendance_status,
            'created_at' => $rsvp->created_at?->toISOString(),
        ];
    }

    private function eventsPayload(): array
    {
        return [
            [
                'id' => 'akad-nikah',
                'title_id' => 'Akad Nikah',
                'event_date' => '2026-06-14T08:00:00+07:00',
                'start_time' => '08:00',
                'end_time' => '10:00',
                'venue_name' => 'Duta Family Estate',
                'is_main_event' => true,
                'sort_order' => 1,
            ],
            [
                'id' => 'resepsi',
                'title_id' => 'Resepsi',
                'event_date' => '2026-06-14T11:00:00+07:00',
                'start_time' => '11:00',
                'end_time' => '14:00',
                'venue_name' => 'Duta Family Estate',
                'is_main_event' => true,
                'sort_order' => 2,
            ],
        ];
    }

    private function configPayload(): array
    {
        return [
            'groom_name' => 'Taufik Nurdiansyah',
            'bride_name' => 'Hera Nurimani',
            'groom_nickname' => 'Taufik',
            'bride_nickname' => 'Hera',
            'wedding_date' => '2026-06-14T08:00:00+07:00',
            'hero_image_url' => '/images/CMZ_4069.jpg',
            'story_text_en' => '',
            'story_text_id' => '',
            'timezone' => 'Asia/Jakarta',
        ];
    }
}
