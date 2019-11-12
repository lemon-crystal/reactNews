// fetch网络请求
// get网络请求
export function getHttp(url) {
	var result = fetch(url, {
		method: "GET"
	})
	return result;
}

// post网络请求
export function postHttp(url, params) {
	var result = fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		// 参数的格式："name=iwen&age=20"
		body: obj2params(params)
	})
	return result;
}

// 处理参数的函数
// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
	var result = '';
	var item;
	for (item in obj) {
		result += '&' + item + '=' + encodeURIComponent(obj[item]);
	}

	if (result) {
		result = result.slice(1);
	}

	return result;
}