const GoogleApiService = require('../../GoogleApiService');
const directionResolver = require('./direction');
const drivingDirectionResolver = require('./drivingDirection');
const walkingDirectionResolver = require('./walkingDirection');
const transitDirectionResolver = require('./transitDirection');
const interfaces = require('./interfaces');
const unions = require('./unions');
const resolverParts = require('./parts');
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
module.exports = [
  rootResolver,
  directionResolver,
  drivingDirectionResolver,
  walkingDirectionResolver,
  transitDirectionResolver,
  interfaces,
  unions,
  resolverParts,
];
