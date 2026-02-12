<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_settings', function (Blueprint $table) {
            $table->id();

            $table->json('hero_section')->nullable();
            $table->json('featured_products')->nullable();
            $table->json('banner_section')->nullable();
            $table->json('categories')->nullable();
            $table->json('meta_data')->nullable();

            $table->string('updated_by')->nullable();

            $table->timestamps();
        });

        // Seed default record
        DB::table('homepage_settings')->insert([
            'hero_section' => json_encode([
                'title' => 'Welcome to Our Store',
                'subtitle' => 'Discover Amazing Products',
                'backgroundImage' => null,
                'ctaText' => 'Shop Now',
                'ctaLink' => '/shop',
                'isActive' => true
            ]),

            'featured_products' => json_encode([
                'title' => 'Featured Products',
                'subtitle' => 'Our best selling items',
                'count' => 8,
                'sortBy' => 'latest',
                'showOutOfStock' => false,
                'isActive' => true
            ]),

            'banner_section' => json_encode([
                'mainBanner' => null,
                'sideBanners' => []
            ]),

            'categories' => json_encode([
                'title' => 'Shop by Category',
                'subtitle' => 'Find what you need',
                'displayType' => 'GRID',
                'categories' => [],
                'count' => 6,
                'isActive' => true
            ]),

            'meta_data' => json_encode([
                'metaTitle' => 'Homepage',
                'metaDescription' => 'Welcome to our store',
                'metaKeywords' => 'store, ecommerce, shop'
            ]),

            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_settings');
    }
};
