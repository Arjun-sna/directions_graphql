import { GraphQLDateTime } from 'graphql-iso-date';
import transitResolvers from './transit';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  transitResolvers,
];
