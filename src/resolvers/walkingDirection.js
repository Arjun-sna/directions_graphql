import { defaultStepNodeResolver } from './shared';

export default {
  WalkStep: {
    ...defaultStepNodeResolver,
    walkSteps: ({ steps }) => steps
  },
}