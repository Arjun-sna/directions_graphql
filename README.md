# GraphQl

# Sample Queries

```
fragment PointDetailsParts on PointDetails {
  formatedTime
  address
  latitude
  longitude
  timeZone
  timeValue
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
      tripDuration
      formattedTripDuration
      tripDistance
      formattedTripDistance
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
