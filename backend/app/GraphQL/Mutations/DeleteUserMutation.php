<?php

namespace App\GraphQL\Mutations;

use App\Models\User;

class DeleteUserMutation
{
    public function deleteUser($_, $args)
    {
        $user = User::find($args['id']);

        if (!$user) {
            return [
                'message' => 'User not found',
                'success' => false,
            ];
        }

        $user->delete();

        return [
            'message' => 'User deleted successfully',
            'success' => true,
        ];
    }
}
