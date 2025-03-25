const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image:{
    type: String,
  },
  age: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false
  },
  contact: {
    type: String,
    required: false
  },
  disability: {
    type: String,
    required: false
  },
  diabetic: {
    type: Boolean,
    required: false
  }
}, {collection:'User'});
mongoose.models= {};

const User = mongoose.model('User', userSchema);
export default User