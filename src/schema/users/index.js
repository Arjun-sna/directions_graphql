const { gql } = require('apollo-server');

module.exports = [gql`
  extend type Query {
    users: [User]! @authentication
  }

  extend type Mutation {
    updateUser(username: String): Boolean! @authentication
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }
`];
