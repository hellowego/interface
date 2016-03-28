var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});


// models
require('./visits');

exports.Visits         = mongoose.model('Visits');