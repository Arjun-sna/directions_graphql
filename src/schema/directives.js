const { gql } = require('apollo-server-express');

module.exports = [gql`
  directive @rateLimit(
    max: Int,
    window: String,
    message: String,
    identityArgs: [String],
    arrayLengthField: String
  ) on FIELD_DEFINITION

  directive @authentication on FIELD_DEFINITION
`];

