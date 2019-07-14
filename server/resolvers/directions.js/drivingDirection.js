const { defaultStepNodeResolver } = require('./shared');

module.exports = {
  DriveStep: {
    ...defaultStepNodeResolver,
    maneuver: ({ maneuver }) => maneuver,
  },
}