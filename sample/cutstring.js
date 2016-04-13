

function transindex(str, index){
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

function cut(str, start, length){
	var index = transindex(str, start);
	var endIndex = transindex(str, start + length);
	console.log("begin:  %s, end: %s ", index, endIndex);
	return str.substring(index, endIndex);
}
