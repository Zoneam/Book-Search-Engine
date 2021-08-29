const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }
  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(_id: String, username: String): User
    users: [User]
    me: User
  }

  input bookData {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveBook(content: bookData!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
