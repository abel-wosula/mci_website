import { gql } from "@apollo/client";

export const MEDIA_QUERY = gql`
  query Media {
    medias {
      data {
        id
        name
        url
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;
