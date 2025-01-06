const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Book Type
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  # User Type
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  # Auth Payload Type for authentication responses
  type Auth {
    token: String!
    user: User!
  }

  # Queries available
  type Query {
    me: User
    getSingleUser(id: ID, username: String): User
  }

  # Input type for saving a book
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  # Mutations available
  type Mutation {
    login(username: String, email: String, password: String!): Auth!
    createUser(username: String!, email: String!, password: String!): Auth!
    saveBook(bookData: BookInput!): User!
    deleteBook(bookId: String!): User!
  }
`;

module.exports = typeDefs;
