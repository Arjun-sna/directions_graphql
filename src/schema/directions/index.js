const directionSchema = require('./direction');
const drivingDirectionSchema = require('./drivingDirection');
const walkingDirectionSchema = require('./walkingDirection');
const transitDirectionSchema = require('./transitDirections');
const interfaces = require('./interfaces');
const unions = require('./unions');
const schemaParts = require('./parts');
const enums = require('./enums');
const queryInputs = require('./queryInput');
const directives = require('./directives');

module.exports = [
  directionSchema,
  drivingDirectionSchema,
  walkingDirectionSchema,
  transitDirectionSchema,
  interfaces,
  unions,
  schemaParts,
  enums,
  queryInputs,
  directives,
];
