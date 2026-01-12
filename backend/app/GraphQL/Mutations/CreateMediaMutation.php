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
        ]);

        return [
            'message' => 'Media created successfully!',
            'Media' => $Media,
            'errors' => null,
        ];
    }
}