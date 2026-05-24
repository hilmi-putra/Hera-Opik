<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GiftRecommendation;

class GiftRecommendationSeeder extends Seeder
{
    /**
     * Seed the gift recommendations table with wedding-themed items.
     */
    public function run(): void
    {
        $gifts = [
            [
                'product_name' => 'Jam Dinding',
                'description' => 'Jam dinding dengan desain minimalis yang elegan untuk mempercantik ruangan rumah baru Anda.',
                'price' => 50000,
                'color' => '#D34D41',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Kipas Angin',
                'description' => 'Kipas angin praktis dengan hembusan sejuk yang membantu menjaga kenyamanan rumah setiap hari.',
                'price' => 152000,
                'color' => '#F7A8B8',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Alat Makan',
                'description' => 'Set alat makan serasi dengan tampilan bersih dan elegan untuk menemani meja makan keluarga.',
                'price' => 65000,
                'color' => '#97C1D9',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Lemari',
                'description' => 'Lemari multifungsi dengan ruang penyimpanan rapi untuk membantu rumah tetap tertata.',
                'price' => 169000,
                'color' => '#F5D17E',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Setrika',
                'description' => 'Setrika ringkas untuk menjaga pakaian tetap rapi dengan hasil yang halus dan nyaman dipakai.',
                'price' => 75000,
                'color' => '#A5C9A1',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Setrika Uap',
                'description' => 'Setrika uap modern yang membantu merapikan pakaian dengan cepat dan hasil yang lebih lembut.',
                'price' => 150000,
                'color' => '#D34D41',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Rice Cooker',
                'description' => 'Rice cooker praktis untuk memasak nasi dengan hasil pulen dan siap menemani kebutuhan dapur harian.',
                'price' => 373000,
                'color' => '#97C1D9',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Kompor',
                'description' => 'Kompor andal dengan desain sederhana yang cocok untuk menunjang aktivitas memasak setiap hari.',
                'price' => 387000,
                'color' => '#F7A8B8',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Rak Sepatu',
                'description' => 'Rak sepatu rapi dan ringkas untuk menjaga area rumah tetap tertata dan bersih.',
                'price' => 50000,
                'color' => '#F5D17E',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Alat Mandi',
                'description' => 'Perlengkapan mandi dengan tampilan bersih dan fungsional untuk kebutuhan rumah tangga harian.',
                'price' => 42000,
                'color' => '#A5C9A1',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Dispenser Beras',
                'description' => 'Dispenser beras praktis untuk menyimpan dan mengambil beras dengan lebih mudah serta higienis.',
                'price' => 38000,
                'color' => '#D34D41',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Wajan',
                'description' => 'Wajan serbaguna yang cocok untuk memasak aneka hidangan rumahan dengan lebih nyaman.',
                'price' => 119000,
                'color' => '#97C1D9',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Set Pisau',
                'description' => 'Set pisau dapur dengan tampilan sederhana dan fungsional untuk membantu persiapan masakan.',
                'price' => 53000,
                'color' => '#F7A8B8',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Tea Pot',
                'description' => 'Tea pot elegan yang cocok untuk melengkapi momen santai bersama pasangan di rumah.',
                'price' => 28000,
                'color' => '#F5D17E',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Rak Bumbu',
                'description' => 'Rak bumbu rapi untuk membantu dapur terlihat lebih tertata dan mudah digunakan saat memasak.',
                'price' => 50000,
                'color' => '#A5C9A1',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://example.com',
                'availability_status' => 'available',
            ],
        ];

        foreach ($gifts as $gift) {
            GiftRecommendation::create($gift);
        }
    }
}
