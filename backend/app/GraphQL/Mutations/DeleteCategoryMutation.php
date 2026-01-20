<?php

namespace App\GraphQL\Mutations;

use App\Models\Category;

class DeleteCategoryMutation
{
    public function deleteCategory($_, $args)
    {
        $category = Category::find($args['id']);

        if (!$category) {
            return [
                'message' => 'Category not found',
                'success' => false,
            ];
        }

        $category->delete();

        return [
            'message' => 'Category deleted successfully',
            'success' => true,
        ];
    }
}