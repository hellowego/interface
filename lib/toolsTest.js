var tools = require("./tools");


function test(){
	var s = "你bcdef";
	var s2 = tools.cutstr(s, 0,1);
	console.log('hello');
	console.log("data: %s", s2);
}

test();