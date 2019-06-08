import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    direction(coordinates: PlaceCoordinatesInput!, travelMode: AllowTravelModes!): Direction
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
    walkSteps: [WalkStep!]
  }

  type TransitStep implements StepNode {
    stepTravelMode: String!
    stepDistance: TypedData!
    stepDuration: TypedData!
    startLocation: Coords!
    endLocation: Coords!
    polyline: String!
    stepInstruction: String!
    arrival: TransitPointDetails!
    departure: TransitPointDetails!
    transitData: TransitData!
  }

  type DriveStep implements StepNode {
    stepTravelMode: String!
    stepDistance: TypedData!
    stepDuration: TypedData!
    startLocation: Coords!
    endLocation: Coords!
    polyline: String!
    stepInstruction: String!
    maneuver: String
  }

  type TransitData {
    headSign: String!
    tripName: String!,
    url: String,
    tripShortName: String,
    stopsCount: Int,
    vehicleIcon: String!
    vehicleName: String!
    vehicleType: String!
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

  union PointDetails = TransitPointDetails | OtherPointDetails

  type OtherPointDetails {
    address: String!
    location: Coords!
  }

  type TransitPointDetails {
    formatedTime: String!
    timeZone: String!
    timeValue: Int!
    address: String!
    location: Coords!
  }

  type Fare {
    currency: String!
    formattedFare: String!
    fareValue: Float!
  }

  enum AllowTravelModes {
    transit
    driving
    walking
  }

  input PlaceCoordinatesInput {
    startLat: Float!
    startLng: Float!
    endLat: Float!
    endLng: Float!
  }
`