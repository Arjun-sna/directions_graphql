import { gql } from 'apollo-server-express';

export default gql`
  type Coords {
    latitude: Float!
    longitude: Float!
  }

  type TypedData {
    formattedValue: String!
    rawValue: Int!
  }

  type OtherPointDetails {
    address: String!
    location: Coords!
  }
`