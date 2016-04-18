var eventproxy = require('eventproxy');

function test() {
	var ep = eventproxy();
	ep.fail(function (err) {
		throw err;
	});

	ep.once('step1', verifyRequetData);
	
	ep.once('step2', requestRecord);
	
	
	
	function verifyRequetData() {
		console.log('---verifyRequetData---');
		
	}

	function requestRecord() {
		console.log('---requestRecord---');
		
	}

	function proxyRequest() {
		console.log('---proxyRequest---');
		
	}
	
	ep.emit("step1", "hello");
}


test();