import { gql } from 'apollo-server';

module.exports = gql`
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
  }


  type Token {
    token: String!
  }
`
