<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateUserMutation
{
    public function updateUser($_, $args)
    {
        $user = User::find($args['id']);

        if (!$user) {
            return [
                'message' => 'User not found!',
                'user' => null,
                'errors' => ['User does not exist'],
            ];
        }

        $data = [];

        if (isset($args['name'])) {
            $data['name'] = $args['name'];
        }

        if (isset($args['email'])) {
            $data['email'] = $args['email'];
        }

        if (isset($args['password'])) {
            $data['password'] = Hash::make($args['password']);
        }

        $user->update($data);

        return [
            'message' => 'User updated successfully!',
            'user' => $user,
            'errors' => null,
        ];
    }
}
