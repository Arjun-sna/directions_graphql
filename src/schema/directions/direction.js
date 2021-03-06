const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    direction(coordinates: PlaceCoordinatesInput!, travelMode: AllowTravelModes!): Direction @rateLimit(window: "60s", max: 5, message: "Limit exceeded. Please, try after sometime") @authentication
  }

  type Direction {
    fare: Fare
    tripData: TripData!
    steps: [StepNode]!
  }

  type Fare {
    currency: String!
    formattedFare: String!
    fareValue: Float!
  }

  type TripData {
    arrival: PointDetails!
    departure: PointDetails!
    tripDistance: TypedData!
    tripDuration: TypedData! 
  }
`