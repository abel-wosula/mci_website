<?php

namespace App\GraphQL\Mutations;

use App\Models\Media;

class DeleteMediaMutation
{
    public function deleteMedia($_, $args)
    {
        $media = Media::find($args['id']);

        if (!$media) {
            return [
                'message' => 'Media not found',
                'success' => false,
            ];
        }

        $media->delete();

        return [
            'message' => 'Media deleted successfully',
            'success' => true,
        ];
    }
}
