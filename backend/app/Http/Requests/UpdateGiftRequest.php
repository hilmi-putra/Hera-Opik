<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGiftRequest extends FormRequest
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
            'product_name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'description' => 'nullable|string|max:500',
            'purchase_link' => 'nullable|url|max:500',
            'price' => 'required|numeric|min:0',
            'color' => 'nullable|string|max:7',
            'total_stock' => 'required|integer|min:1',
            'purchased_count' => 'nullable|integer|min:0',
        ];
    }

    /**
     * Get custom attribute names for error messages.
     */
    public function attributes(): array
    {
        return [
            'product_name' => 'Nama Produk',
            'image' => 'Gambar',
            'description' => 'Deskripsi',
            'purchase_link' => 'Link Pembelian',
            'price' => 'Harga',
            'color' => 'Warna',
            'total_stock' => 'Total Stok',
            'purchased_count' => 'Jumlah Terbeli',
        ];
    }
}
