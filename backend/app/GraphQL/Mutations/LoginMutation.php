<?php

namespace App\GraphQL\Mutations;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;

class LoginMutation
{
    public function login($_, array $args)
    {
        $user = User::where('email', $args['email'])->first();

        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw new Exception("Invalid credentials");
        }

        return [
            'token' => $user->createToken('admin')->plainTextToken, 
            'user' => $user,
            'message' => 'Login successful',
        ];
    }
}
