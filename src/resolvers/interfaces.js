export default {
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
}