const { gql } = require('apollo-server-express');

module.exports = gql`
  interface StepNode {
    stepTravelMode: String!
    stepDistance: TypedData!
    stepDuration: TypedData!
    startLocation: Coords!
    endLocation: Coords!
    polyline: String!
    stepInstruction: String!
  }
`