<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Seed the admin user.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@herataufik.com'],
            [
                'name' => 'Admin Wedding',
                'password' => Hash::make('wedding2026'),
            ]
        );
    }
}
