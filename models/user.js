var mongoose = require('mongoose');
var Schema    = mongoose.Schema;



var UserSchema = new Schema({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String },
  email: { type: String},
  url: { type: String },
});

mongoose.model('User', UserSchema);

