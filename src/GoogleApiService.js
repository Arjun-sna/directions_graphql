const { create } = require('apisauce');
const { GOOGLE_API_KEY } = process.env;

const googleApiRequest = create({
  baseURL: 'https://maps.googleapis.com/',
  timeout: '10000',
  headers: {
    Accept: 'application/json',
  },
});

class GoogleApiService {
  static decodePolyline(t, e) {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;
  
    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
    }
  
    return (d = d.map(t => ({
      latitude: t[0],
      longitude: t[1],
    })));
  }

  static async getTransitRoute(origin, destination, transitMode) {
    if (!origin || !destination) {
      return;
    }

    if (origin.latitude && origin.longitude) {
      origin = `${origin.latitude},${origin.longitude}`;
    }

    if (destination.latitude && destination.longitude) {
      destination = `${destination.latitude},${destination.longitude}`;
    }

    const params = {
      origin,
      waypoints: '',
      destination,
      key: GOOGLE_API_KEY,
      mode: 'transit',
      language: 'en',
      transit_mode: transitMode,
    }
    const transitResponse = await googleApiRequest.get('maps/api/directions/json', params);

    if (transitResponse.ok) {
      return transitResponse.data.routes[0];
    }

    return null;
  }
  
  static async getRouteBetween(origin, destination, travelMode = 'driving', wayPoints) {
    if (!origin || !destination) {
      return;
    }

    if (origin.latitude && origin.longitude) {
      origin = `${origin.latitude},${origin.longitude}`;
    }

    if (destination.latitude && destination.longitude) {
      destination = `${destination.latitude},${destination.longitude}`;
    }

    if (!wayPoints || !wayPoints.length) {
      wayPoints = '';
    } else {
      wayPoints = wayPoints.map(wayPoint => (wayPoint.latitude && wayPoint.longitude
          ? `${wayPoint.latitude},${wayPoint.longitude}`
          : wayPoint)).join('|');
    }

    const params = {
      origin,
      waypoints: wayPoints,
      destination,
      key: GOOGLE_API_KEY,
      mode: travelMode,
      language: 'en',
    }
    const directionsDataResponse = await googleApiRequest.get('maps/api/directions/json', params);

    if (directionsDataResponse.ok) {
      const routesAvailable = directionsDataResponse.data.routes;

      if (routesAvailable.length) {
        const route = routesAvailable[0];
        const distance = route.legs.reduce((carry, curr) => carry + curr.distance.value, 0);
        const duration = route.legs.reduce((carry, curr) => carry + curr.duration.value, 0) / 60; 
        const startLocation = {
          ...route.legs[0].start_location,
          description: route.legs[0].start_address,
        };
        const endLocation = {
          ...route.legs[0].end_location,
          description: route.legs[0].end_address,
        };

        return {
          distance: Number(distance.toFixed(2)),
          duration: Number(duration.toFixed(2)),
          polylinePoints: route.overview_polyline.points,
          coordinates: GoogleApiService.decodePolyline(route.overview_polyline.points),
          startLocation,
          endLocation,
          travelMode,
        }
      }
    }
  };
}

module.exports = GoogleApiService;
