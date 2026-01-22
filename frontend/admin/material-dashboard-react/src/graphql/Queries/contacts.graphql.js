import { gql } from "@apollo/client";

export const CONTACTS_QUERY = gql`
  query Contacts {
    contacts {
      data {
        id
        name
        email
        message
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;

