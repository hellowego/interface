var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  server: {auto_reconnect: true, poolSize: 20}
}, function (err) {
  if (err) {
    console.log('connect to %s error: ', err.message);
    process.exit(1);
  }
});


// models
require('./user');

exports.User         = mongoose.model('User');