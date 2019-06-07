import GoogleApiService from '../GoogleApiService';

const defaultStepNodeResolver = {
  stepTravelMode: ({ travel_mode }) => travel_mode,
  stepDistance: ({ distance: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  stepDuration: ({ duration: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  startLocation: ({ start_location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  endLocation: ({ end_location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  polyline: ({ polyline: { points } }) => points,
  stepInstruction: ({ html_instructions: htmlInstructions }) => htmlInstructions,
}

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
    },
    drivingDirection: async (parent, { coordinates }, context) => {
      const {
        startLat, startLng, endLat, endLng
      } = coordinates;
      const transitRoute = await  GoogleApiService.getTransitRoute(
        { latitude: startLat, longitude: startLng },
        { latitude: endLat, longitude: endLng },
        'driving'
      );
      return transitRoute;
    },
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
    steps: (parent) => parent.legs[0].steps,
  },
  TripData: {
    __resolveType({ arrival_time, departure_time }, context, info) {
      if (arrival_time && departure_time) {
        return 'TransitTripData';
      } else {
        return 'DrivingTripData';
      }
    }
  },
  TransitTripData: {
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
    tripDistance: ({ distance: { text, value } }) => ({ formattedValue: text, rawValue: value }),
    tripDuration: ({ duration: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  },
  DrivingTripData: {
    arrival: async ({
      start_address: address,
      start_location: location,
    }) => ({ address, location }),
    departure: async ({
      end_address: address,
      end_location: location,
    }) => ({ address, location }),
    tripDistance: ({ distance: { text, value } }) => ({ formattedValue: text, rawValue: value }),
    tripDuration: ({ duration: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  },
  DrivingPointDetails: {
    address: ({ address }) => address,
    location: ({ location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  },
  TransitPointDetails: {
    formatedTime: ({ timeDetails: { text } }) => text,
    timeZone: ({ timeDetails: { time_zone } }) => time_zone,
    timeValue: ({ timeDetails: { value } }) => value,
    address: ({ address }) => address,
    location: ({ location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  },
  StepNode: {
    __resolveType({ travel_mode: travelMode }, context, info) {
      switch (travelMode) {
        case 'WALKING':
          return 'WalkStep';
        case 'TRANSIT':
          return 'TransitStep';
        case 'DRIVING':
          return 'DriveStep'
        default:
          return null;
      } 
    },
  },
  WalkStep: {
    ...defaultStepNodeResolver,
    walkSteps: ({ steps }) => steps
  },
  TransitStep: {
    ...defaultStepNodeResolver,
    arrival: ({ transit_details: {
      arrival_time: timeDetails,
      arrival_stop: { name: address, location },
    }}) => ({ timeDetails, address, location }),
    departure: ({ transit_details: {
      departure_time: timeDetails,
      departure_stop: { name: address, location },
    }}) => ({ timeDetails, address, location }),
    transitData: ({ transit_details: transitDetails }) => transitDetails
  },
  DriveStep: {
    ...defaultStepNodeResolver,
    maneuver: ({ maneuver }) => maneuver,
  },
  TransitData: {
    headSign: ({ headsign: headSign }) => headSign,
    stopsCount: ({ num_stops: stopsCount }) => stopsCount,
    tripShortName: ({ line: { short_name: tripShortName } }) => tripShortName,
    tripName: ({ line: { name } }) => name,
    url: ({ line: { url } }) => url,
    vehicleIcon: ({ line: { vehicle } }) => vehicle.icon,
    vehicleName: ({ line: { vehicle } }) => vehicle.name,
    vehicleType: ({ line: { vehicle } }) => vehicle.type,
  }
}