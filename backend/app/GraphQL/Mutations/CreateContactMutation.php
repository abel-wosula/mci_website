<?php

namespace App\GraphQL\Mutations;

use App\Models\Contact;

use Illuminate\Support\Facades\Hash;

class CreateContactMutation
{
     public function createContact($_, $args)
    {

        $Contact= Contact::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'message' => $args['message'],
            
        ]);

        return [
            'message' => 'Media created successfully!',
            'Contact' => $Contact,
            'errors' => null,
        ];
    }
}