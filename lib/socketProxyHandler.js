/**
 *
 * socketProxyHandler.js
 * socket服务端
 * 功能：接受Http请求，并转发
 *
 */

var net = require('net');
var async = require('async');
var EventProxy = require('eventproxy');

//处理请求
function requestHandler(sock) {

	async.series([
			fetchReqData,
			verifyRequetData,
			requestRecord,
			proxyRequest
		], function (err, results) {
		console.log(err);
	});

	//获取请求报文体
	function fetchReqData(callback) {
		console.log('---FetchReqData---');
		sock.on('data', function (data) {
			console.log('DATA ' + sock.remoteAddress + ': ' + data);

			var postData = data.body;

			sock.write('You said "' + data + '"');

		});

		// 为这个socket实例添加一个"close"事件处理函数
		sock.on('close', function (data) {

			console.log('CLOSED: ' +
				sock.remoteAddress + ' ' + sock.remotePort);
		});

		sock.on('error', function (err) {
			console.log('socket error - ', err);
		});

		callback();

	}

	function verifyRequetData(callback) {
		console.log('---verifyRequetData---');
		callback();
	}

	function requestRecord(callback) {
		console.log('---requestRecord---');
		callback();
	}

	function proxyRequest(callback) {
		console.log('---proxyRequest---');
		callback();
	}

	

}

module.exports.requestHandler = requestHandler;
