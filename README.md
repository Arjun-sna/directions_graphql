# Node GraphQL Server

Sample GraphQL nodejs server.


GraphQL wrapper over the Google directions API.

[Try it here](https://directions-graphql.herokuapp.com/graphql)

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
fragment OtherPointDetailsParts on OtherPointDetails {
  address
  location {
    latitude
    longitude
  }
}
fragment TripDataPart on TripData {
  arrival {
    ... on TransitPointDetails {
    	...TransitPointDetailsParts
    }
    ... on OtherPointDetails {
      ...OtherPointDetailsParts
    }
  }
  departure {
    ... on TransitPointDetails {
    	...TransitPointDetailsParts
    }
    ... on OtherPointDetails {
      ...OtherPointDetailsParts
    }
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
query($coordinates: PlaceCoordinatesInput!, $travelMode: AllowTravelModes!) {
  direction(coordinates: $coordinates, travelMode: $travelMode) {
    fare {
      formattedFare
      currency
      fareValue
    }
    tripData {
      ...TripDataPart
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
  "travelMode": "walking"
}
```
