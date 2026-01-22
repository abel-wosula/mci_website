<?php

namespace App\GraphQL\Mutations;
use App\Models\Contact;

class UpdateContactMutation
{
    public function updateContact($_, $args)
    {
        $Contact = Contact::find($args['id']);

        if (!$Contact) {
            return [
                'message' => 'Contact not found.',
                'Contact' => null,
                'errors' => ['Contact with the given ID does not exist.'],
            ];
        }

        // Update only the provided fields
        if (isset($args['name'])) {
            $Contact->name = $args['name'];
        }
        if (isset($args['email'])) {
            $Contact->email = $args['email'];
        }
        if (isset($args['message'])) {
            $Contact->message = $args['message'];
        }

        $Contact->save();

        return [
            'message' => 'Contact updated successfully!',
            'Contact' => $Contact,
            'errors' => null,
        ];
    }
}