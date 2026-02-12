<?php

namespace App\GraphQL\Mutations;

use App\Models\HomepageSetting;

use Illuminate\Support\Facades\Hash;

class CreateHomepageSettingMutation
{
    public function createHomepageSetting($_, $args)
    {

        $HomepageSetting = HomepageSetting::create([
            'hero_section' => $args['hero_section'],
            'featured_products' => $args['featured_products'],
            'banner_section' => $args['banner_section'],
            'categories' => $args['categories'],
            'meta_data' => $args['meta_data']
        ]);

        return [
            'message' => 'HomepageSetting created successfully!',
            'HomepageSetting' => $HomepageSetting,
            'errors' => null,
        ];
    }
}
