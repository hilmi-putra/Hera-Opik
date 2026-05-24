<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRsvpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'guest_name' => 'required|string|max:255',
            'attendance_status' => 'required|in:attending,not_attending',
            'events' => 'nullable|array',
            'events.*' => 'in:akad_nikah,resepsi',
            'total_attendees' => 'nullable|integer|min:1|max:3',
            'notes' => 'nullable|string|max:1000',
            'phone_number' => 'nullable|string|max:20',
        ];
    }

    /**
     * Get custom attribute names for error messages.
     */
    public function attributes(): array
    {
        return [
            'guest_name' => 'Nama Tamu',
            'attendance_status' => 'Status Kehadiran',
            'events' => 'Acara',
            'total_attendees' => 'Jumlah Tamu',
            'notes' => 'Pesan/Catatan',
            'phone_number' => 'Nomor Telepon',
        ];
    }
}
