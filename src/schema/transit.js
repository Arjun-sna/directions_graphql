import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    transitDirection(coordinates: PlaceCoordinatesInput): Direction
  }

  type Direction {
    fare: Fare
    tripData: TripData!
  }
  
  type TypedData {
    formattedValue: String!
    rawValue: Int!
  }

  type TripData {
    arrival: PointDetails!
    departure: PointDetails!
    tripDistance: TypedData!
    tripDuration: TypedData! 
  }

  type PointDetails {
    formatedTime: String!
    timeZone: String!,
    timeValue: Int!
    address: String!
    latitude: Float!
    longitude: Float!
  }

  type Fare {
    currency: String!
    formattedFare: String!
    fareValue: Float!
  }

  input PlaceCoordinatesInput {
    startLat: Float!
    startLng: Float!
    endLat: Float!
    endLng: Float!
  }
`