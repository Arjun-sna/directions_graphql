import GoogleApiService from '../GoogleApiService';

export default {
  Query: {
    transitDirection: async (parent, { coordinates }, context) => {
      const {
        startLat, startLng, endLat, endLng
      } = coordinates;
      const transitRoute = await  GoogleApiService.getTransitRoute(
        { latitude: startLat, longitude: startLng },
        { latitude: endLat, longitude: endLng },
      );

      return transitRoute;
    } 
  },
  DataFields: {
    __resolveType(data, context, info) {
      if (data.currency) {
        return 'Fare';
      }
    }
  }
}