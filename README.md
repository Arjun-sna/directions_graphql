# Node GraphQL Server

Sample GraphQL nodejs server.


GraphQL wrapper over the Google directions API.

# Sample Query

```graphql
fragment PointDetailsParts on PointDetails {
  formatedTime
  address
  timeZone
  timeValue
  location {
    latitude
    longitude
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
query($coordinates: PlaceCoordinatesInput) {
  transitDirection(coordinates: $coordinates) {
    fare {
      formattedFare
      currency
      fareValue
    }
    tripData {
      arrival {
        ...PointDetailsParts
      }
      departure {
        ...PointDetailsParts
      }
      tripDuration {
        ...TypedDataParts
      }
      tripDistance {
        ...TypedDataParts
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
        ...PointDetailsParts
        }
        departure {
          ...PointDetailsParts
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
  }
}
```
