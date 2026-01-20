import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query Users {
    users {
      data {
        id
        name
        email
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;

