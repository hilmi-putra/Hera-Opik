<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClaimGiftRequest extends FormRequest
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
            'claimed_by' => 'required|string|max:255',
            'claimed_phone' => 'required|string|max:20',
            'claimed_email' => 'required|email|max:255',
            'quantity' => 'required|integer|min:1',
        ];
    }

    /**
     * Get custom attribute names for error messages.
     */
    public function attributes(): array
    {
        return [
            'claimed_by' => 'Nama Pembeli',
            'claimed_phone' => 'No. WhatsApp',
            'claimed_email' => 'Email',
            'quantity' => 'Jumlah Produk',
        ];
    }
}
