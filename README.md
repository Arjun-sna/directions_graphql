# Node GraphQL Server

Sample GraphQL nodejs server.


GraphQL wrapper over the Google directions API.

# Sample Query

```graphql
fragment TransitPointDetailsParts on TransitPointDetails {
  formatedTime
  address
  timeZone
  timeValue
  location {
    latitude
    longitude
  }
}
fragment DrivingPointDetailsParts on DrivingPointDetails {
  address
  location {
    latitude
    longitude
  }
}
fragment TransitTripPart on TransitTripData {
  arrival {
    ...TransitPointDetailsParts
  }
  departure {
    ...TransitPointDetailsParts
  }
  tripDuration {
    ...TypedDataParts
  }
  tripDistance {
    ...TypedDataParts
  }
}
fragment DrivingTripPart on DrivingTripData {
  arrival {
    ...DrivingPointDetailsParts
  }
  departure {
    ...DrivingPointDetailsParts
  }
  tripDuration {
    ...TypedDataParts
  }
  tripDistance {
    ...TypedDataParts
  }
}
fragment TypedDataParts on TypedData {
  formattedValue
  rawValue
}
fragment CoordsPart on Coords {
  latitude
  longitude
}
query($coordinates: PlaceCoordinatesInput!, $travleMode: AllowTravelModes!) {
  direction(coordinates: $coordinates, travelMode: $travleMode) {
    fare {
      formattedFare
      currency
      fareValue
    }
    tripData {
      ... on DrivingTripData {
       	... DrivingTripPart
      }
      ... on TransitTripData {
        ... TransitTripPart
      }
    }
    steps {
      stepTravelMode
      stepDistance {
        ...TypedDataParts
      }
      stepDuration {
        ...TypedDataParts
      }
      startLocation {
        ...CoordsPart
      }
      endLocation {
        ...CoordsPart
      }
      polyline
      stepInstruction
      ... on WalkStep {
        walkSteps {
          stepTravelMode
          stepInstruction
        }
      }
      ... on TransitStep {
        arrival {
        ...TransitPointDetailsParts
        }
        departure {
          ...TransitPointDetailsParts
        }
        transitData {
          tripName
          tripShortName
          url
          headSign
          stopsCount
          vehicleIcon
          vehicleName
          vehicleType
        }
      }
    }
  }
}

input:
{
  "coordinates": {
    "startLat": 37.7919227,
    "startLng": -122.4152148,
    "endLat": 37.6213171,
    "endLng": -122.3811441
  },
  "travleMode": "walking"
}
```
