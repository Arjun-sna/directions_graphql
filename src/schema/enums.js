import { gql } from 'apollo-server-express';

export default gql`
  enum AllowTravelModes {
    transit
    driving
    walking
  }
`