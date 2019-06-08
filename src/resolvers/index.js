import { GraphQLDateTime } from 'graphql-iso-date';
import GoogleApiService from '../GoogleApiService';
import directionResolver from './direction';
import drivingDirectionResolver from './drivingDirection';
import walkingDirectionResolver from './walkingDirection';
import transitDirectionResolver from './transitDirection';
import interfaces from './interfaces';
import unions from './unions';
import resolverParts from './parts';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const rootResolver = {
  Query: {
    direction: async (parent, { coordinates, travelMode }, context) => {
      const {
        startLat, startLng, endLat, endLng
      } = coordinates;
      const directionData = await  GoogleApiService.getDirectionData(
        { latitude: startLat, longitude: startLng },
        { latitude: endLat, longitude: endLng },
        travelMode
      );

      return directionData;
    },
  }
}

export default [
  rootResolver,
  directionResolver,
  drivingDirectionResolver,
  walkingDirectionResolver,
  transitDirectionResolver,
  interfaces,
  unions,
  resolverParts
];
