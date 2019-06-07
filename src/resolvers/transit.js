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
    arrival: async ({
      arrival_time: timeDetails,
      start_address: address,
      start_location: location,
    }) => ({ timeDetails, address, location }),
    departure: async ({
      departure_time: timeDetails,
      end_address: address,
      end_location: location,
    }) => ({ timeDetails, address, location }),
    tripDistance: async ({ distance }) => distance.value,
    formattedTripDistance: async ({ distance }) => distance.text,
    tripDuration: async ({ duration }) => duration.value,
    formattedTripDuration: async ({ duration }) => duration.text,
  },
  PointDetails: {
    formatedTime: ({ timeDetails: { text } }) => text,
    timeZone: ({ timeDetails: { time_zone } }) => time_zone,
    timeValue: ({ timeDetails: { value } }) => value,
    address: ({ address }) => address,
    latitude: ({ location: { lat } }) => lat,
    longitude: ({ location: { lng } }) => lng,
  },
}