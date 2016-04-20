/**
 *
 * util.js
 * 工具库
 *
 */

 var _ = require('lodash');
 
function transindex (str, index){
	var temIndex = 0;
	if(index <= 0){
		return 0;
	}
	
	for(var i=0;i<str.length;i++){  
		if(str.charCodeAt(i)>255){  
            temIndex+=2;  			
        }else{  
            temIndex++  ;			
        } 
		
		if(temIndex == index){  
            return i + 1;  
        }else if(temIndex >index){  
            return i;  
        }  
	}
	
	return str.length;
}

exports.cutstr = function(str, start, length){
	var index = transindex(str, start);
	var endIndex = transindex(str, start + length);
	return str.substring(index, endIndex);
};


exports.validator = function(obj, ruleobj){
	// 判断是否为json对象
	try{
		// var jsonobj = JSON.parse(obj);
		// var jsonRule = JSON.parse(ruleobj);
		
		var result = true;
		var msg = "";
		var found = false;
		var ret = {};
		ret.errcode = -1;
		
		_.forEach(obj, function (objValue, objKey) {
			console.log("objValue : %s, objKey : %s", objValue, objKey);
			found = false;
			_.forEach(ruleobj, function(rule, field){
				if (field == objKey){
					found = true;
					// 判断字段是否合法	
					console.log(rule);
					_.forEach(rule, function(ruleValue, ruleKey){		
						console.log("ruleValue : %s, ruleKey : %s", ruleValue, ruleKey);
						if(ruleKey == "length"){							
							if(objValue.length != Number(ruleValue)){
								msg = objKey + ": 字段长度错误";		
								console.log(msg);
								result = false;
								return false;		
							}
						}else if(ruleKey == "type"){							
							if(ruleValue == "number"){								
								if(!isFinite(Number(objValue))){
									msg = objKey + ": 必须为数字";
									return false;
								}
							}
						}
					});
					if (!result) {
						return false;
					}
					
				}
			});	
			if (!result){
				return false;
			}
			
			if(!found){
				msg = objKey + ": 未找到字段";				
				return false;
			}
		});
		if (!result || !found){
			ret.errcode = -1;
			ret.errmsg = msg;
			return ret;			
		}
		
	}catch(err){		
		ret.errcode = -1;
		ret.errmsg = msg;
		return ret;
	}
		
	ret.errcode = 0;
	ret.errmsg = msg;
	console.log("msg %s ", msg);
	return ret;
};








// module. = tools;