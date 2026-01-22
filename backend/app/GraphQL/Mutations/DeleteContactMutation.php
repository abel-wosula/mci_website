<?php
namespace App\GraphQL\Mutations;

use App\Models\Contact;
class DeleteContactMutation
{
    public function deleteContact($_, $args)
    {
        $Contact = Contact::find($args['id']);

        if (!$Contact) {
            return [
                'message' => 'Contact not found.',
                'Contact' => null,
                'errors' => ['Contact with the given ID does not exist.'],
            ];
        }

        $Contact->delete();

        return [
            'message' => 'Contact deleted successfully!',
            'Contact' => $Contact,
            'errors' => null,
        ];
    }
}