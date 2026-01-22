import { gql } from "@apollo/client";

export const PAGES_QUERY = gql`
  query {
    pages {
      data {
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
