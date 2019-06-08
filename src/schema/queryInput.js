import { gql } from 'apollo-server-express';

export default gql`
  input PlaceCoordinatesInput {
    startLat: Float!
    startLng: Float!
    endLat: Float!
    endLng: Float!
  }
`