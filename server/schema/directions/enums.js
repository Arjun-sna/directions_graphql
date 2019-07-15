const { gql } = require('apollo-server-express');

module.exports = gql`
  enum AllowTravelModes {
    transit
    driving
    walking
  }
`