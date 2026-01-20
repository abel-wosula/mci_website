<?php

namespace App\GraphQL\Mutations;

use App\Models\Media;

use Illuminate\Support\Facades\Hash;

class CreateMediaMutation
{
     public function createMedia($_, $args)
    {

        $Media = Media::create([
            'url' => $args['url'],
            'name' => $args['name'],
            'category_id' => $args['category_id']
        ]);

        return [
            'message' => 'Media created successfully!',
            'Media' => $Media,
            'errors' => null,
        ];
    }
}