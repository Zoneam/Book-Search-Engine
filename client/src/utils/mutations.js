import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        _id
        username
      }
    }
  };

  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser($username: String, $email: String, $password: String) {
      token
      user {
        _id
        username
      }
    }
  };

  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  };

  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;