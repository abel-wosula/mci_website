import { gql } from "@apollo/client";

// ------------------- CREATE MEDIA -------------------
export const CREATE_MEDIA_MUTATION = gql`
  mutation CreateMedia($input: CreateMediaInput!) {
    createMedia(input: $input) {
      message
      media {
        id
        name
        url
        category_id
      }
      errors
    }
  }
`;

// ------------------- UPDATE MEDIA -------------------
export const UPDATE_MEDIA_MUTATION = gql`
  mutation UpdateMedia($input: UpdateMediaInput!) {
    updateMedia(input: $input) {
      message
      media {
        id
        name
        url
        category_id
      }
      errors
    }
  }
`;

// ------------------- DELETE MEDIA -------------------
export const DELETE_MEDIA_MUTATION = gql`
  mutation DeleteMedia($input: DeleteMediaInput!) {
    deleteMedia(input: $input) {
      message
      errors
    }
  }
`;
