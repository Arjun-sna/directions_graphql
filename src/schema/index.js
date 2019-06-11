const { gql } = require('apollo-server-express');
const authSchema = require('./auth');
const directionSchemas = require('./directions');
const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  ...authSchema,
  ...directionSchemas,
];
