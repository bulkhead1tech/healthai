const mongoose = require('mongoose');

const token = new mongoose.Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
}, {collection:'Token'});
mongoose.models= {};

const Token = mongoose.model('Token', token);
export default Token