<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Auth;

class HomepageSetting extends Model
{
    protected $table = 'homepage_settings';

    protected $fillable = [
        'hero_section',
        'featured_products',
        'banner_section',
        'categories',
        'meta_data',
        'updated_by'
    ];

    /**
     * Automatically convert JSON <-> array
     */
    protected $casts = [
        'hero_section' => 'array',
        'featured_products' => 'array',
        'banner_section' => 'array',
        'categories' => 'array',
        'meta_data' => 'array',
    ];

    /**
     * Auto-set updated_by when record updates
     */
    protected static function booted()
    {
        static::updating(function ($model) {

            // Avoid crashes in queues / CLI / guests
            if (Auth::check()) {
                $user = Auth::user();

                $model->updated_by =
                    $user->name
                    ?? $user->email
                    ?? $user->id;
            }
        });
    }

    /**
     * Singleton-style helper
     * (Since homepage usually has one config row)
     */
    public static function getSettings(): self
    {
        return self::firstOrFail();
    }

    /**
     * Accessor for full hero background URL
     * Uses camelCase to match frontend
     */
    protected function heroBackgroundUrl(): Attribute
    {
        return Attribute::make(
            get: function () {

                $hero = $this->hero_section ?? [];

                return isset($hero['backgroundImage'])
                    ? asset('storage/' . $hero['backgroundImage'])
                    : null;
            }
        );
    }
}
