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
```
