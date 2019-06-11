const { GraphQLDateTime } = require('graphql-iso-date');
const directionResolvers = require('./directions.js');
const authResolvers = require('./auth.js');
const customScalarResolver = {
  Date: GraphQLDateTime,
};

const rootResolver = {
  Query: { },
  Mutation: { },
}

module.exports = [
  rootResolver,
  ...directionResolvers,
  ...authResolvers,
];
