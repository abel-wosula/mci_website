<?php

namespace App\GraphQL\Mutations;

use App\Models\Page;

use Illuminate\Support\Facades\Hash;

class CreatePageMutation
{
     public function createPage($_, $args)
    {

        $Page = Page::create([
            'title' => $args['title'],
            'content' => $args['content'],
            'slug' => $args['slug'],
            'is_published' => $args['is_published'],
            'status_id' => $args['status_id'],
        ]);

        return [
            'message' => 'Page created successfully!',
            'Page' => $Page,
            'errors' => null,
        ];
    }
}