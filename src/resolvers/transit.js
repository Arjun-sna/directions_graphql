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
  Direction: {
    fare: async ({ fare }, { coordinates }, context) => {
      if (fare) {
        const { text, value, currency } = fare;
        return {
          formattedFare: text,
          fareValue: value,
          currency: currency,
        }
      }
    },
  },
  TripData: {
    arrival: async (parent, { coordinates }, context) => {
      console.log(parent)
      return parent;
    }
  }
}