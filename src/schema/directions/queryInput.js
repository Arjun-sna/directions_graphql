const { gql } = require('apollo-server-express');

module.exports = gql`
  input PlaceCoordinatesInput {
    startLat: Float!
    startLng: Float!
    endLat: Float!
    endLng: Float!
  }
`