const { gql } = require('apollo-server');

module.exports = [gql`
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): User!
    signIn(userIdentifier: String!, password: String!): AuthData!
  }

  type AuthData {
    token: String!
    user: User!
  }
`];
