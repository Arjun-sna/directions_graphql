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
    fare: async ({ fare }, args, context) => {
      if (fare) {
        const { text, value, currency } = fare;

        return {
          formattedFare: text,
          fareValue: value,
          currency: currency,
        }
      }
    },
    tripData: (parent) => parent.legs[0],
  },
  TripData: {
    arrival: async (parent, { coordinates }, context) => {
      const {
        arrival_time: arrivalTime,
        start_address: startAddress,
        start_location: startLocation,
      } = parent;

      return {
        formatedTime: arrivalTime.text,
        timeZone: arrivalTime.time_zone,
        timeValue: arrivalTime.value,
        address: startAddress,
        latitude: startLocation.lat,
        longitude: startLocation.lng
      };
    },
    departure: async (parent, { coordinates }, context) => {
      const {
        departure_time: departureTime,
        end_address: endAddress,
        end_location: endLocation,
      } = parent;

      return {
        formatedTime: departureTime.text,
        timeZone: departureTime.time_zone,
        timeValue: departureTime.value,
        address: endAddress,
        latitude: endLocation.lat,
        longitude: endLocation.lng
      };
    },
    tripDistance: async ({ distance }) => distance.value,
    formattedTripDistance: async ({ distance }) => distance.text,
    tripDuration: async ({ duration }) => duration.value,
    formattedTripDuration: async ({ duration }) => duration.text,
  }
}