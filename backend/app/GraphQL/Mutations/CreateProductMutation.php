<?php

namespace App\GraphQL\Mutations;

use App\Models\Product;

use Illuminate\Support\Facades\Hash;

class CreateProductMutation
{
     public function createProduct($_, $args)
    {

        $product = Product::create([
            'name' => $args['name'],
            'description' => $args['description'],
            'category_id' => $args['category_id'],
            'image_url' => $args['image_url'],
        ]);

        return [
            'message' => 'Product created successfully!',
            'product' => $product,
            'errors' => null,
        ];
    }
}