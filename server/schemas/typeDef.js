// Mini project reference
const { gql } = require("apollo-server-express");

const typeDefs = gql`
// fix
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    // fix
    saveBook(userId: ID!, content: BookContent!): User
    removeBook(book: String!): User
  }
`;

module.exports = typeDefs;
