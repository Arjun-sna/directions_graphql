import { gql } from 'apollo-server-express';

export default gql`
  union PointDetails = TransitPointDetails | OtherPointDetails
`