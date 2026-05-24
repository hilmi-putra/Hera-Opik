<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rsvps', function (Blueprint $table) {
            $table->id();
            $table->string('guest_name');
            $table->enum('attendance_status', ['attending', 'not_attending'])->default('attending');
            $table->json('events')->nullable()->comment('Array of selected events: akad_nikah, resepsi');
            $table->unsignedInteger('total_attendees')->default(1);
            $table->text('notes')->nullable()->comment('Messages or wishes from guest');
            $table->string('phone_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvps');
    }
};
