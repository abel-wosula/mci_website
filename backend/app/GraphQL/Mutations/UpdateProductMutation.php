<?php

namespace App\GraphQL\Mutations;

use App\Models\Product;
class UpdateProductMutation
{
    public function updateProduct($_, $args)
    {
        $product = Product::find($args['id']);

        if (!$product) {
            return [
                'message' => 'Product not found!',
                'product' => null,
                'errors' => ['Product does not exist'],
            ];
        }

        $data = [];

        if (isset($args['name'])) {
            $data['name'] = $args['name'];
        }

        if (isset($args['description'])) {
            $data['description'] = $args['description'];
        }

        if (isset($args['category_id'])) {
            $data['category_id'] = $args['category_id'];
        }

        if (isset($args['image_url'])) {
            $data['image_url'] = $args['image_url'];
        }

        $product->update($data);

        return [
            'message' => 'Product updated successfully!',
            'product' => $product,
            'errors' => null,
        ];
    }
}

