const { gql } = require('apollo-server-express');

module.exports = gql`
  type Coords {
    latitude: Float!
    longitude: Float!
  }

  type TypedData {
    formattedValue: String!
    rawValue: Int!
  }

  type OtherPointDetails {
    address: String!
    location: Coords!
  }
`