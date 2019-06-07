import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    transitDirection(coordinates: PlaceCoordinatesInput): Direction
  }

  type Direction {
    fare: Fare
  }

  type Fare {
    currency: String
    text: String
    value: Float
  }

  input PlaceCoordinatesInput {
    startLat: Float!
    startLng: Float!
    endLat: Float!
    endLng: Float!
  }
`