<?php

namespace App\GraphQL\Mutations;
use App\Models\Page;

class UpdatePageMutation
{
     public function updatePage($_, $args)
    {
        $Page = Page::find($args['id']);

        if (!$Page) {
            return [
                'message' => 'Page not found.',
                'Page' => null,
                'errors' => ['Page with the given ID does not exist.'],
            ];
        }

        $Page->update([
            'title' => $args['title'] ?? $Page->title,
            'content' => $args['content'] ?? $Page->content,
            'slug' => $args['slug'] ?? $Page->slug,
            'is_published' => $args['is_published'] ?? $Page->is_published,
            'status_id' => $args['status_id'] ?? $Page->status_id,
        ]);

        return [
            'message' => 'Page updated successfully!',
            'Page' => $Page,
            'errors' => null,
        ];
    }
}