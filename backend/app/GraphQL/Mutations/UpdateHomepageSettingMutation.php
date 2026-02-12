<?php

namespace App\GraphQL\Mutations;
use App\Models\HomepageSetting;

class UpdateHomepageSettingMutation
{
    public function updateHomepageSetting($_, $args)
    {
        $HomepageSetting = HomepageSetting::find($args['id']);

        if (!$HomepageSetting) {
            return [
                'message' => 'HomepageSetting not found',
                'success' => false,
            ];
        }

        if (isset($args['hero_section'])) {
            $HomepageSetting->hero_section = $args['hero_section'];
        }
        if (isset($args['featured_products'])) {
            $HomepageSetting->featured_products = $args['featured_products'];
        }
        if (isset($args['banner_section'])) {
            $HomepageSetting->banner_section = $args['banner_section'];
        }
        if (isset($args['categories'])) {
            $HomepageSetting->categories = $args['categories'];
        }
        if (isset($args['meta_data'])) {
            $HomepageSetting->meta_data = $args['meta_data'];
        }

        $HomepageSetting->save();

        return [
            'message' => 'HomepageSetting updated successfully!',
            'HomepageSetting' => $HomepageSetting,
            'errors' => null,
        ];
    }
}