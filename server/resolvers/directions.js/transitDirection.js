const { defaultStepNodeResolver } = require('./shared');

module.exports = {
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
  TransitData: {
    headSign: ({ headsign: headSign }) => headSign,
    stopsCount: ({ num_stops: stopsCount }) => stopsCount,
    tripShortName: ({ line: { short_name: tripShortName } }) => tripShortName,
    tripName: ({ line: { name } }) => name,
    url: ({ line: { url } }) => url,
    vehicleIcon: ({ line: { vehicle } }) => vehicle.icon,
    vehicleName: ({ line: { vehicle } }) => vehicle.name,
    vehicleType: ({ line: { vehicle } }) => vehicle.type,
  },
  TransitPointDetails: {
    formatedTime: ({ timeDetails: { text } }) => text,
    timeZone: ({ timeDetails: { time_zone } }) => time_zone,
    timeValue: ({ timeDetails: { value } }) => value,
    address: ({ address }) => address,
    location: ({ location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  }
}