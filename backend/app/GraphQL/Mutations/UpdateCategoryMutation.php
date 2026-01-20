<?php

namespace App\GraphQL\Mutations;
use App\Models\Category;

class UpdateCategoryMutation
{
    public function updateCategory($_, $args)
    {
        $category = Category::find($args['id']);

        if (!$category) {
            return [
                'message' => 'Category not found',
                'success' => false,
            ];
        }

        if (isset($args['name'])) {
            $category->name = $args['name'];
        }

        $category->save();

        return [
            'message' => 'Category updated successfully!',
            'category' => $category,
            'errors' => null,
        ];
    }
}