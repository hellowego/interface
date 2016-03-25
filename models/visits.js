var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test', {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    console.log('connect to %s error: ', 'mongodb://localhost:27017/test', err.message);
    process.exit(1);
  }
});

var Cat = mongoose.model('Cat', {
  name: String,
  friends: [String],
  age: Number,
});

var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
kitty.age = 3;

kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});



// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var Cat = mongoose.model('Cat', { name: String });

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
  // if (err) {
    // console.log(err);
  // } else {
    // console.log('meow');
  // }
// });