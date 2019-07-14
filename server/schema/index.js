const { gql } = require('apollo-server-express');
const authSchema = require('./auth');
const userSchema = require('./users');
const directionSchemas = require('./directions');
const directives = require('./directives');

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
  ...userSchema,
  ...directionSchemas,
  ...directives,
];
