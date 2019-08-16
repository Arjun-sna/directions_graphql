const { gql } = require('apollo-server-express');

module.exports = gql`
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

  type TransitData {
    headSign: String!
    tripName: String,
    url: String,
    tripShortName: String,
    stopsCount: Int,
    vehicleIcon: String!
    vehicleName: String!
    vehicleType: String!
  }

  type TransitPointDetails {
    formatedTime: String!
    timeZone: String!
    timeValue: Int!
    address: String!
    location: Coords!
  }

`