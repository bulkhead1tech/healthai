const mongoose = require('mongoose');

const FitnessDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true}, 
  activity: {
    type: String,
    required: true,
  },
  cardio_fitness: {
    type: String,
  },
  electrocardiogram: {
    type: String,
  },
  heartrate: {
    type: Number,
  },
  irregular_rhythm_notifications: {
    type: Boolean, 
  },
  nutrition: {
    type: String,
  },
  oxygen_saturation: {
    type: Number,
  },
  profile: {
    type: String,
  },
  respiratory_rate: {
    type: Number,
  },
  sleep: {
    type: String,
  },
  temperature: {
    type: Number,
  },
  weight: {
    type: Number,
  },
}, {collection: "FitnessData"});

mongoose.models= {};
const FitnessData = mongoose.model('FitnessData', FitnessDataSchema);
export default FitnessData