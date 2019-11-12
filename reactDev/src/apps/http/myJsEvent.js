/**
 * Created by Administrator on 2017/9/19.
 */

/**
 *  一个斜杠两个星回车
 * @param ele
 * @param type
 * @param func
 * 所谓js框架就是集成的js代码
 */
function bindEvent(ele, type, func) {
  if (ele.addEventListener) {
    ele.addEventListener(type, func);
  } else {
    ele.attachEvent('on' + type, func);
  }
}
/*    // 声明一个变量用于存储生成的验证码
    //document.getElementById('code').onclick = changeImg;
    var code='';
    function changeImg(){
        // 验证码组成库
        var arrays=new Array(
            '1','2','3','4','5','6','7','8','9','0',
            'a','b','c','d','e','f','g','h','i','j',
            'k','l','m','n','o','p','q','r','s','t',
            'u','v','w','x','y','z',
            'A','B','C','D','E','F','G','H','I','J',
            'K','L','M','N','O','P','Q','R','S','T',
            'U','V','W','X','Y','Z'
        );
        // 重新初始化验证码
        code ='';
        // 随机从数组中获取四个元素组成验证码
        for(var i = 0; i<4; i++){
            // 随机获取一个数组的下标
            var r = parseInt(Math.random()*arrays.length);
            code += arrays[r];
        }
        // 验证码写入span区域
        document.getElementById('code').innerHTML = code;

    }

    // 验证验证码
    function check(){
        var error;
        // 获取用户输入的验证码
        var codeInput = document.getElementById('codeInput').value;
        if(codeInput.toLowerCase() == code.toLowerCase()){
            //console.log('123');
            return true;
        }else{
            //error = '验证码错误，重新输入';
            //document.getElementById('errorTips').innerHTML = error;
            return false;
        }
    }*/

// 验证码：
function createCode() {
  var strCode = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var code = '';
  for (var i = 0; i < 4; i++) {
    var strIndex = Math.floor(Math.random() * strCode.length);
    code += strCode[strIndex];
  }
  return code;
}

//兼容性
var Event = {
  stop: function() {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  prevent: function() {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  addEvent: function(ele, type, handler) {
    if (ele.addEventListener) {
      ele.addEventListener(type, handler);
    } else if (ele.attachEvent) {
      ele.attachEvent('on' + type, handler);
    } else {
      ele['on' + type] = handler;
    }
  },
  removeEvent: function(ele, type, handler) {
    if (ele.addEventListener) {
      ele.removeEventListener(type, handler);
    } else if (ele.attachEvent) {
      ele.detachEvent('on' + type, handler);
    } else {
      ele['on' + type] = null;
    }
  }

};
//解析数据
function dataParse(str) {
  var result = str.slice(1).split('&');
  var resultObj = {};
  for (var i = 0; i < result.length; i++) {
    var tempArr = result[i].split('=');
    resultObj[tempArr[0]] = tempArr[1];
  }
  return resultObj;
}
// ajax兼容
function getXmlHttp() {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}
// 封装设置cookie expires 代表秒
export function setcookie(key, value, expires, path) {
  value = escape(value);
  expires = new Date(new Date().getTime() + expires * 1000).toGMTString();
  document.cookie = key + "=" + value + ";expires=" + expires + ";path=" + path;
}
// 获得cookie 值
export function getcookie(key) {
  var cookie = document.cookie;
  if (cookie.length <= 0) {
    return "null";
  } else {
    if (cookie.indexOf(key) == -1) {
      return "-1";
    } else {
      // 分割字符串
      // if(cookie)
      // console.log(cookie);
      var arr = cookie.split(";");
      for (var j = 0; j < arr.length; j++) {
        var arr2 = arr[j].split("=");
        if (arr2[0].trim() == key) {
          return unescape(arr2[1]);
        }
      }
    }
  }
}