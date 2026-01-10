<?php

namespace App\GraphQL\Mutations;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class CreateUserMutation
{
     public function createUser($_, $args)
    {

        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
        ]);

        return [
            'message' => 'User created successfully!',
            'user' => $user,
            'errors' => null,
        ];
    }
}
