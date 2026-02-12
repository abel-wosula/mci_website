<?php

namespace App\GraphQL\Mutations;

use App\Models\Media;

use Illuminate\Support\Facades\Hash;

class CreateMediaMutation
{
     public function createMedia($_, $args)
    {

        $Media = Media::create([
            'name' => $args['name'],
            'file_path' => $args['file_path'],
            'file_name' => $args['file_name'],
            'media_type' => $args['media_type'],
            'alt_text' => $args['alt_text'],
            'title' => $args['title'],
            'description' => $args['description'],
            'category_id' => $args['category_id']
        ]);

        return [
            'message' => 'Media created successfully!',
            'Media' => $Media,
            'errors' => null,
        ];
    }
}