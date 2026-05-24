<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rsvp;

class RsvpSeeder extends Seeder
{
    /**
     * Seed the RSVP table with dummy wedding data.
     */
    public function run(): void
    {
        $rsvps = [
            [
                'guest_name' => 'Budi Santoso',
                'attendance_status' => 'attending',
                'events' => ['akad_nikah', 'resepsi'],
                'total_attendees' => 3,
                'notes' => 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, dan warohmah.',
                'phone_number' => '081234567890',
            ],
            [
                'guest_name' => 'Siti Nurhaliza',
                'attendance_status' => 'attending',
                'events' => ['resepsi'],
                'total_attendees' => 2,
                'notes' => 'Barakallahu lakuma wa baraka alaikuma. Selamat ya Hera & Taufik!',
                'phone_number' => '082345678901',
            ],
            [
                'guest_name' => 'Ahmad Hidayat',
                'attendance_status' => 'attending',
                'events' => ['akad_nikah'],
                'total_attendees' => 1,
                'notes' => 'Insya Allah hadir di akad. Semoga lancar semuanya!',
                'phone_number' => '083456789012',
            ],
            [
                'guest_name' => 'Dewi Lestari',
                'attendance_status' => 'not_attending',
                'events' => null,
                'total_attendees' => 1,
                'notes' => 'Mohon maaf tidak bisa hadir, tapi doa terbaik untuk kalian berdua.',
                'phone_number' => '084567890123',
            ],
            [
                'guest_name' => 'Rizky Pratama',
                'attendance_status' => 'attending',
                'events' => ['akad_nikah', 'resepsi'],
                'total_attendees' => 4,
                'notes' => 'Hadir sekeluarga! Semoga bahagia selalu.',
                'phone_number' => '085678901234',
            ],
            [
                'guest_name' => 'Fitri Handayani',
                'attendance_status' => 'attending',
                'events' => ['resepsi'],
                'total_attendees' => 2,
                'notes' => 'Congrats Hera & Taufik! Akhirnya merayakan takdir ini ya.',
                'phone_number' => '086789012345',
            ],
            [
                'guest_name' => 'Irfan Hakim',
                'attendance_status' => 'not_attending',
                'events' => null,
                'total_attendees' => 1,
                'notes' => 'Sayang sekali tidak bisa hadir. Semoga pernikahannya berkah.',
                'phone_number' => '087890123456',
            ],
            [
                'guest_name' => 'Nurul Aini',
                'attendance_status' => 'attending',
                'events' => ['akad_nikah', 'resepsi'],
                'total_attendees' => 2,
                'notes' => 'Saya dan suami insya Allah hadir. Barakallah!',
                'phone_number' => '088901234567',
            ],
            [
                'guest_name' => 'Farhan Maulana',
                'attendance_status' => 'attending',
                'events' => ['resepsi'],
                'total_attendees' => 3,
                'notes' => 'Hadir bersama keluarga. Semoga jadi pasangan yang saling melengkapi.',
                'phone_number' => '089012345678',
            ],
            [
                'guest_name' => 'Aisyah Zahra',
                'attendance_status' => 'attending',
                'events' => ['akad_nikah'],
                'total_attendees' => 1,
                'notes' => 'Happy wedding! Semoga cinta kalian abadi.',
                'phone_number' => '081123456789',
            ],
            [
                'guest_name' => 'Yusuf Rahman',
                'attendance_status' => 'not_attending',
                'events' => null,
                'total_attendees' => 1,
                'notes' => 'Maaf tidak bisa hadir, sedang di luar kota. Doa terbaik untuk kalian.',
                'phone_number' => '082234567890',
            ],
            [
                'guest_name' => 'Putri Wulandari',
                'attendance_status' => 'attending',
                'events' => ['akad_nikah', 'resepsi'],
                'total_attendees' => 2,
                'notes' => 'Senang sekali bisa merayakan hari bahagia kalian!',
                'phone_number' => '083345678901',
            ],
        ];

        foreach ($rsvps as $rsvp) {
            Rsvp::create($rsvp);
        }
    }
}
