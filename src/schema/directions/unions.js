const { gql } = require('apollo-server-express');

module.exports = gql`
  union PointDetails = TransitPointDetails | OtherPointDetails
`