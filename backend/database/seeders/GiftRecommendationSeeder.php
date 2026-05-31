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
                'product_name' => 'Setrika',
                'description' => 'Setrika praktis untuk merapikan pakaian sehari-hari. Memiliki pemanas yang cepat dan mudah digunakan sehingga pakaian terlihat lebih rapi dan nyaman dipakai.',
                'price' => 140000,
                'color' => '#A5C9A1',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/Z3Rpkyys',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Mejikom',
                'description' => 'Rice cooker multifungsi untuk memasak, menghangatkan, dan menjaga kualitas nasi agar tetap pulen. Cocok untuk kebutuhan rumah tangga sehari-hari.',
                'price' => 450000,
                'color' => '#97C1D9',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/AkHdUszr',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Kompor',
                'description' => 'Kompor berkualitas yang membantu proses memasak menjadi lebih cepat dan efisien. Cocok digunakan untuk berbagai kebutuhan dapur.',
                'price' => 300000,
                'color' => '#F7A8B8',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/JeucFydZ',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Jam Dinding',
                'description' => 'Jam dinding minimalis dengan desain sederhana yang dapat mempercantik ruangan sekaligus memudahkan melihat waktu setiap saat.',
                'price' => 40000,
                'color' => '#D34D41',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/a7Kbokfv',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Kipas Angin',
                'description' => 'Kipas angin hemat listrik yang memberikan sirkulasi udara sejuk dan nyaman untuk kamar, ruang tamu, maupun area kerja.',
                'price' => 140000,
                'color' => '#F7A8B8',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/piwQ1Chi',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Rak Sepatu',
                'description' => 'Rak sepatu praktis untuk menyimpan dan menata koleksi sepatu agar lebih rapi, bersih, dan mudah ditemukan.',
                'price' => 35000,
                'color' => '#F5D17E',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/xmnWEcEb',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Wajan Set',
                'description' => 'Paket perlengkapan memasak yang terdiri dari beberapa jenis wajan untuk mendukung berbagai kebutuhan memasak di dapur.',
                'price' => 100000,
                'color' => '#97C1D9',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/q9uqLEnp',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Pisau Set',
                'description' => 'Set pisau dapur dengan berbagai ukuran yang memudahkan proses memotong, mengiris, dan menyiapkan bahan makanan.',
                'price' => 50000,
                'color' => '#F7A8B8',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/1hsLuesP',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Tempat Beras',
                'description' => 'Wadah penyimpanan beras yang membantu menjaga kebersihan dan kualitas beras agar tetap aman dari debu maupun serangga.',
                'price' => 100000,
                'color' => '#D34D41',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/qwgw2vDs',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Oven Listrik',
                'description' => 'Oven listrik praktis untuk memanggang berbagai makanan seperti roti, kue, ayam, dan aneka hidangan lainnya dengan hasil yang merata.',
                'price' => 200000,
                'color' => '#A5C9A1',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/BLXnx7S2',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Koper',
                'description' => 'Koper dengan kapasitas penyimpanan yang luas untuk menemani perjalanan, liburan, maupun keperluan lainnya dengan lebih nyaman.',
                'price' => 170000,
                'color' => '#F5D17E',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/C2uan32L',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Set Alat Makan',
                'description' => 'Paket perlengkapan makan yang terdiri dari beberapa peralatan makan dengan desain menarik dan cocok untuk penggunaan sehari-hari.',
                'price' => 60000,
                'color' => '#97C1D9',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/C2uan32L',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Lemari Plastik',
                'description' => 'Lemari plastik ringan dan tahan lama yang cocok digunakan untuk menyimpan pakaian, perlengkapan rumah tangga, maupun barang pribadi.',
                'price' => 200000,
                'color' => '#F5D17E',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/spjRap5w',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Alat Pel',
                'description' => 'Peralatan kebersihan yang membantu membersihkan lantai dengan lebih mudah, cepat, dan efektif untuk menjaga kebersihan rumah.',
                'price' => 80000,
                'color' => '#A5C9A1',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/xXTyVtTw',
                'availability_status' => 'available',
            ],
            [
                'product_name' => 'Air Fryer',
                'description' => 'Alat memasak modern yang memungkinkan mengolah makanan dengan lebih sedikit minyak sehingga lebih praktis dan sehat untuk keluarga.',
                'price' => 250000,
                'color' => '#D34D41',
                'total_stock' => 1,
                'purchased_count' => 0,
                'purchase_link' => 'https://id.shp.ee/9Lr7vJAH',
                'availability_status' => 'available',
            ],
        ];

        foreach ($gifts as $gift) {
            GiftRecommendation::create($gift);
        }
    }
}
