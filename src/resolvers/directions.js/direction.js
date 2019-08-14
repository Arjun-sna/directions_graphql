module.exports = {
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
    steps: (parent) => parent.legs[0].steps,
  },
  TripData: {
    arrival: async ({
      departure_time: timeDetails,
      end_address: address,
      end_location: location,
    }) => ({ timeDetails, address, location }),
    departure: async ({
      arrival_time: timeDetails,
      start_address: address,
      start_location: location,
    }) => ({ timeDetails, address, location }),
    tripDistance: ({ distance: { text, value } }) => ({ formattedValue: text, rawValue: value }),
    tripDuration: ({ duration: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  },
}