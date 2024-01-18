import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      name
      token
      expires
      path
      domain
      secure
      httpOnly
    }
  }
`;
