const { gql } = require('apollo-server');

module.exports = [gql`
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): User!
    signIn(email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }
`];
