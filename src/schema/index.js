const { gql } = require('apollo-server-express');
const authSchema = require('./auth');
const userSchema = require('./users');
const googleDirectionSchemas = require('./google');
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
  ...googleDirectionSchemas,
  ...directives,
];
