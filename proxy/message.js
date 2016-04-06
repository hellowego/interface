/**
 *
 * message.js
 * 报文模型访问db方法
 * 功能：db model dao
 *
 */
var models  = require('../models');
var Message    = models.Message;


/**
 * 根据origDomain查找报文记录
 * Callback:
 * - err, 数据库异常
 * - Message, 用户
 * @param {String} origDomain 接口
 * @param {Function} callback 回调函数
 */
exports.getMessageByOrigDomain = function (origDomain, callback) {
  Message.findOne({'origDomain': origDomain}, callback);
};


/**
 * 根据origDomain查找报文记录
 * Callback:
 * - err, 数据库异常
 * - message, 消息
 * @param {String} ip 发送方ip
 * @param {String} origDomain 接口
 * @param {String} message 报文信息
 * @param {Date} createtime 接受时间
 * @param {Date} updatetime 更新时间
 * @param {String} errcode 报文处理结果编码
 * @param {String} errmsg 报文处理结果信息
 */
exports.newAndSave = function ( id, ip, origDomain, msg, errcode, errmsg, callback) {
  var message         	= new Message();
  message._id = id;
  message.ip        	= ip;
  message.origDomain   	= origDomain;
  message.body       = msg;
  // message.createtime    = createtime;  
  // message.updatetime   	= updatetime;
  // message.errcode       = errcode;
  // message.errmsg       	= errmsg;
  message.save(callback);

  
};

exports.updateRet = function (id, errcode, errmsg, callback) {
	Message.findOne({_id: id}, function(err, msg){
		if(err || !msg){
			return callback(err);
		}
		
		msg.errcode = errcode;
		// msg.errmsg = 
	});
};


