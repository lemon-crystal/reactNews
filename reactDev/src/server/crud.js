// 增删改查
var Conn = require("./conn.js");

var CRUD = {
	sqlCRUD: function(sql, arr, callback) {
		// query的参数
		// 参数1：sql语句
		// 参数2：sql语句的参数
		Conn.Client.query(sql, arr, function(error, result) {
			if (error) {
				return;
			}
			callback(result);
		})
	}
}

module.exports = CRUD;