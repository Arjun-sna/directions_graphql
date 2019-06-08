import { gql } from 'apollo-server-express';
import directionSchema from './direction';
import drivingDirectionSchema from './drivingDirection';
import walkingDirectionSchema from './walkingDirection';
import transitDirectionSchema from './transitDirections';
import interfaces from './interfaces';
import unions from './unions';
import schemaParts from './parts';
import enums from './enums';
import queryInputs from './queryInput';

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

export default [
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
