import { gql } from 'apollo-server';

module.exports = gql`
  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
    updateUser(username: String): Boolean!
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Token {
    token: String!
  }
`