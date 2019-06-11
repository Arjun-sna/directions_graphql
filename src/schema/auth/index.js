const { gql } = require('apollo-server');

module.exports = [gql`
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Boolean!
    signIn(email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }
`];
