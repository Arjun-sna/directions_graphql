export const defaultStepNodeResolver = {
  stepTravelMode: ({ travel_mode }) => travel_mode,
  stepDistance: ({ distance: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  stepDuration: ({ duration: { text, value } }) => ({ formattedValue: text, rawValue: value }),
  startLocation: ({ start_location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  endLocation: ({ end_location: { lat, lng } }) => ({ latitude: lat, longitude: lng }),
  polyline: ({ polyline: { points } }) => points,
  stepInstruction: ({ html_instructions: htmlInstructions }) => htmlInstructions,
}