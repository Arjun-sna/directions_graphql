import { gql } from 'apollo-server-express';

export default gql`
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
`