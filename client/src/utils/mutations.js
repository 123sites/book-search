// # 26

import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// update, naming
export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $content: BookContent!) {
    saveBook(userId: $userId, content: $content) {
      _id
      savedBooks {
        title
      }
    }
  }
`;
// update, naming
export const REMOVE_BOOK = gql`
  mutation removeBook($book: String!) {
    removeBook(book: $book) {
      _id
      username
      savedBooks
    }
  }
`;
