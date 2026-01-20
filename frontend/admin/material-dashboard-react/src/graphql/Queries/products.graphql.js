import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      data {
        id
        name
        description
        image_url
        category_id
      }
    }
  }
`;
