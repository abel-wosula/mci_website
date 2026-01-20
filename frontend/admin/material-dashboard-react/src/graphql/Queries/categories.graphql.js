import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      data {
        id
        name
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;