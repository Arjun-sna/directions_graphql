const { gql } = require('apollo-server-express');
const directionSchema = require('./direction');
const drivingDirectionSchema = require('./drivingDirection');
const walkingDirectionSchema = require('./walkingDirection');
const transitDirectionSchema = require('./transitDirections');
const interfaces = require('./interfaces');
const unions = require('./unions');
const schemaParts = require('./parts');
const enums = require('./enums');
const queryInputs = require('./queryInput');

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
  directionSchema,
  schemaParts,
  interfaces,
  unions,
  drivingDirectionSchema,
  walkingDirectionSchema,
  transitDirectionSchema,
  enums,
  queryInputs
];
