var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};(function(){function setLocalStorageCache(key,value){var localStorage=window.localStorage;var saveValue=JSON.stringify(value);localStorage.setItem(key,saveValue);return saveValue}function getLocalStorageCache(key){var localStorage=window.localStorage;var valueJson=localStorage.getItem(key);if(valueJson===undefined||valueJson===null){return null}return JSON.parse(valueJson)}function removeLocalStorageCache(key){var localStorage=window.localStorage;localStorage.removeItem(key)}function dealResponse(data){try{return JSON.parse(data)}catch(e){return{}}}function ajaxCallBack(xmlhttp,config){if(xmlhttp.status===200){var data=dealResponse(xmlhttp.responseText);if(config.onSuccess){config.onSuccess(data)}}else if(config.onError){config.onError()}}function prepareParams(params){var str="";if(!params||(typeof params==="undefined"?"undefined":_typeof(params))!=="object"){return""}Object.assign(params).forEach(function(key){str+=key+"="+params[key]+"&"});str=str.substr(0,str.length-1);return str}function ajax(config){var xmlhttp=void 0;if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}var method=config.method?config.method:"GET";method=method.toUpperCase();var async=config.async===undefined?true:config.async;var paramStr=prepareParams(config.params);var url=paramStr&&method==="GET"?config.url+"?"+paramStr:config.url;xmlhttp.open(method,url,async);if(method==="GET"){xmlhttp.send()}else{xmlhttp.send(JSON.stringify(config.params))}if(async){xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState===4){ajaxCallBack(xmlhttp,config)}}}else{ajaxCallBack(xmlhttp,config)}}function sendData(trackerData){ajax({method:"post",url:"http://40.125.201.98/trackerInfo",params:trackerData,onSuccess:function onSuccess(){removeLocalStorageCache("trackerLog")},onError:function onError(){removeLocalStorageCache("trackerLog")}})}function setData(config){var username=config.username,appID=config.appID,module=config.module,level=config.level,message=config.message;var trackerData=getLocalStorageCache("trackerLog");if(!trackerData){trackerData=[{time:(new Date).getTime(),username:username,appID:appID,module:module,level:level,message:message,count:1}]}else{var i=void 0;for(i=0;i<trackerData.length;i+=1){var item=trackerData[i];if(item.username===username&&item.module===module&&item.level===level){if(item.message.indexOf(message)<0){item.message+=" | "+message}item.count+=1;break}}if(i===trackerData.length){trackerData.push({time:(new Date).getTime(),username:username,appID:appID,module:module,level:level,message:message,count:1})}}var trackerDataStr=setLocalStorageCache("trackerLog",trackerData);if(trackerDataStr.length>5*1024){sendData(trackerData)}}function setConnectData(config){var version=config.version,username=config.username,requestIn=config.requestIn,level=config.level,message=config.message;switch(requestIn){case"Home":setData({version:version,username:username,appID:"Dashboard",module:11,level:level,message:message});break;default:break}}window.threathunterTracker={setData:setData,setConnectData:setConnectData};setInterval(function(){var trackerData=getLocalStorageCache("trackerLog");if(trackerData){sendData(trackerData)}},6e4);removeLocalStorageCache("trackerLog")})();