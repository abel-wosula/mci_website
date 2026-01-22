import { gql } from "@apollo/client";


export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      id
      name
      email
      message
    }
    errors
  }
`;
export const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($input: DeleteContactInput!) {
    deleteContact(input: $input) {
        message
        errors
    }
  }
`;