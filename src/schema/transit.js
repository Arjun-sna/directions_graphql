import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    transitDirection(coordinates: PlaceCoordinatesInput): Direction
  }

  type Direction {
    fare: Fare
    tripData: TripData!
    steps: [StepNode]!
  }

  interface StepNode {
    stepTravelMode: String!
    stepDistance: TypedData!
    stepDuration: TypedData!
    startLocation: Coords!
    endLocation: Coords!
    polyline: String!
    stepInstruction: String!
  }

  type WalkStep implements StepNode {
    stepTravelMode: String!
    stepDistance: TypedData!
    stepDuration: TypedData!
    startLocation: Coords!
    endLocation: Coords!
    polyline: String!
    stepInstruction: String!
    walkSteps: [StepNode]!
  }

  type TransitStep implements StepNode {
    stepTravelMode: String!
    stepDistance: TypedData!
    stepDuration: TypedData!
    startLocation: Coords!
    endLocation: Coords!
    polyline: String!
    stepInstruction: String!
    arrival: PointDetails!
    departure: PointDetails!
    headSign: String!
    name: String!,
    shortName: String,
    url: String,
    vehicle: Vehicle
  }

  type Vehicle {
    icon: String!
    name: String!
    type: String!
  }

  type Coords {
    latitude: Float!
    longitude: Float!
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