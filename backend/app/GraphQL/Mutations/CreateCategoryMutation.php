<?php

namespace App\GraphQL\Mutations;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;

class CreateCategoryMutation
{
     public function createCategory($_, $args)
    {

        $category = Category::create([
            'name' => $args['name'],
        ]);

        return [
            'message' => 'Category created successfully!',
            'category' => $category,
            'errors' => null,
        ];
    }
}