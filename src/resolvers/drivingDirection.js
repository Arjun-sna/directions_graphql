import { defaultStepNodeResolver } from './shared';

export default {
  DriveStep: {
    ...defaultStepNodeResolver,
    maneuver: ({ maneuver }) => maneuver,
  },
}