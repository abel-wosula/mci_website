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
            'url' => $args['url'] ?? $media->url,
            'name' => $args['name'] ?? $media->name,
            'category_id' => $args['category_id'] ?? $media->category_id,
        ]);

        return [
            'message' => 'Media updated successfully!',
            'media' => $media,
            'errors' => null,
        ];
    }
}
