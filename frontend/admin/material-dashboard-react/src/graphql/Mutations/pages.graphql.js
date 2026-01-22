import { gql } from "@apollo/client";

export const CREATE_PAGE_MUTATION = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      message
      page {
       id
        title
        slug
        content
        status_id
        is_published
      }
    }
  }
`;

export const UPDATE_PAGE_MUTATION = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      message
      page {
        id
        title
        slug
        content
        status_id
        is_published
      }
    }
  }
`;

export const DELETE_PAGE_MUTATION = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      message
    }
  }
`;
