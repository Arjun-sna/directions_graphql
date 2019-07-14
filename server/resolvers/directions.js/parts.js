module.exports = {
  OtherPointDetails: {
    address: ({ address }) => address,
    location: ({ location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  },
}