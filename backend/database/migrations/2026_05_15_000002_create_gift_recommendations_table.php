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
        Schema::create('gift_recommendations', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->string('purchase_link')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->string('color', 7)->default('#D34D41')->comment('Hex color for card display');
            $table->unsignedInteger('total_stock')->default(1);
            $table->unsignedInteger('purchased_count')->default(0);
            $table->boolean('is_claimed')->default(false);
            $table->string('claimed_by')->nullable();
            $table->string('claimed_phone')->nullable();
            $table->string('claimed_email')->nullable();
            $table->enum('availability_status', ['available', 'partially_claimed', 'fully_claimed'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gift_recommendations');
    }
};
