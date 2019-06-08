module.exports = {
  PointDetails: {
    __resolveType({ timeDetails }, context, info) {
      if (timeDetails) {
        return 'TransitPointDetails';
      } else {
        return 'OtherPointDetails';
      }
    }
  },
}