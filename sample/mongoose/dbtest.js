var _            = require('lodash');
var eventproxy   = require('eventproxy');
var UserProxy    = require('./proxy').User;



function test(){
	console.log('hello '); 
	loginname = 'hi';
	passhash = '123456';
	email = 'hi@hi.com';
	UserProxy.newAndSave(loginname, loginname, passhash, email, function (err) {
        if (err) {
          console.log('hello 1'); 
        }
        console.log('hello 2'); 
      });
	  
	 console.log('hello 3'); 
}

test();
