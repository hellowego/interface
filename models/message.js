/**
 *
 * message.js
 * 报文模型
 * 功能：db model
 *
 */
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;

var MessageSchema = new Schema({
	_id : {type: mongoose.Schema.Types.ObjectId},
  ip: { type: String},
  origDomain: { type: String},
  body: { type: String},  
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date, default: Date.now  },
  errcode: {type: Number},
  errmsg: {type: String}
});

mongoose.model('Message', MessageSchema);
