const { gql } = require('apollo-server');

module.exports = [gql`
  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    updateUser(username: String): Boolean! @authentication
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }
`];
