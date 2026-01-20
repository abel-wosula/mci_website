<?php

namespace App\GraphQL\Mutations;
use App\Models\Product;

class DeleteProductMutation
{
    public function deleteProduct($_, $args)
    {
        $product = Product::find($args['id']);

        if (!$product) {
            return [
                'message' => 'Product not found',
                'success' => false,
            ];
        }

        $product->delete();

        return [
            'message' => 'Product deleted successfully',
            'success' => true,
        ];
    }
}