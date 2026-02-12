<?php

namespace App\GraphQL\Mutations;

use App\Models\Media;

class UpdateMediaMutation
{
     public function updateMedia($_, $args)
    {
        $media = Media::find($args['id']);

        if (!$media) {
            return [
                'message' => 'Media not found',
                'media' => null,
                'errors' => ['Media not found'],
            ];
        }

        $media->update([
            'name' => $args['name'] ?? $media->name,
            'file_path' => $args['file_path'] ?? $media->file_path,
            'file_name' => $args['file_name'] ?? $media->file_name,
            'media_type' => $args['media_type'] ?? $media->media_type,
            'alt_text' => $args['alt_text'] ?? $media->alt_text,
            'title' => $args['title'] ?? $media->title,
            'description' => $args['description'] ?? $media->description,
            'category_id' => $args['category_id'] ?? $media->category_id
        ]);

        return [
            'message' => 'Media updated successfully!',
            'media' => $media,
            'errors' => null,
        ];
    }
}
