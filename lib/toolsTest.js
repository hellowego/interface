var tools = require("./tools");


function test1(){
	var s = "你bcdef";
	var s2 = tools.cutstr(s, 0,1);
	console.log('hello');
	console.log("data: %s", s2);
};

function test2(){
	var obj = {"name":"hellowego", "age":"00", "sex":"0"};
	var ruleobj = {"name":{"length":"9"}, "age":{"length":"2", "type":"number"}};
	var bl;
	var msg = "";
	bl = tools.validator(obj, ruleobj, function (msg){
		console.log(msg);
	});
	console.log("reulst: %s, msg: %s", bl, msg);
	
}

function test3(){
	var a = '00';
	console.log( Number(a));
	console.log(isFinite( Number(a)));
	if (typeof Number(a) == 'number'){
		console.log("number");
	}else{
		console.log("string");
	}
	
	var msg = "";
	if(!msg){
		console.log("true");
	}
}

test2();