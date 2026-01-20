<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            // Add 'name' column if it doesn't exist
            if (!Schema::hasColumn('media', 'name')) {
                $table->string('name')->after('id');
            }

            // Increase url length to 2048 for long URLs
            $table->string('url', 2048)->change();

            // Add category_id column
            if (!Schema::hasColumn('media', 'category_id')) {
                $table->foreignId('category_id')->constrained('category')->cascadeOnDelete()->after('url');

            }
        });
    }

    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            if (Schema::hasColumn('media', 'name')) {
                $table->dropColumn('name');
            }

            // Revert url length back to 255
            $table->string('url', 255)->change();

            if (Schema::hasColumn('media', 'category_id')) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            }
        });
    }
};
