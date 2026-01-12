<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateUser
{
    public function __invoke($_, array $args)
    {
        $user = User::findOrFail($args['id']);

        if (isset($args['input']['password'])) {
            $args['input']['password'] = Hash::make($args['input']['password']);
        }

        $user->update($args['input']);

        return [
            'user' => $user,
            'message' => 'User updated successfully',
            'errors' => null,
        ];
    }
}
