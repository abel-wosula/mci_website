<?php

namespace App\GraphQL\Mutations;

use App\Models\HomepageSetting;

class DeleteHomepageSettingMutation
{
    public function deleteHomepageSetting($_, $args)
    {
        $HomepageSetting = HomepageSetting::find($args['id']);

        if (!$HomepageSetting) {
            return [
                'message' => 'HomepageSetting not found',
                'success' => false,
            ];
        }

        $HomepageSetting->delete();

        return [
            'message' => 'HomepageSetting deleted successfully',
            'success' => true,
        ];
    }
}
