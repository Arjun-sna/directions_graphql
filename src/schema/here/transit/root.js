import { gql } from 'apollo-server-express';

module.exports = gql`
  extend type Query {
    transit(coordinates: PlaceCoordinatesInput!): Transit
  }

  type Transit {
    fare: TransitFare
    transitData: TransitData!
    transitSteps: TransitSteps!
  }

  type TransitFare {
    totalFare: String!
    currency: String!
  }

  type TransitData {
    
  }
`