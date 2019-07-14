const { defaultStepNodeResolver } = require('./shared');

module.exports = {
  WalkStep: {
    ...defaultStepNodeResolver,
    walkSteps: ({ steps }) => steps
  },
}