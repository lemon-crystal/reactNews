var express = require("express");
var router = express.Router();
var crud = require("./crud.js");
var path_url = require("./api.js");


router.all("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
})

// 注册
router.post(path_url.reg, function(req, res) {
	// 接受参数
	var username = req.body.username;
	var password = req.body.password;
	var sql = "insert into user values (null,?,?)";
	var insertArr = [username, password];
	var check = "select * from user where username=?";
	var checkArr = [username];
	crud.sqlCRUD(check, checkArr, function(result) {
		if (result.length > 0) {
			res.json(200, {
				msg: "此用户名已存在，请重新填写",
				code: "-2"
			});
		} else {
			crud.sqlCRUD(sql, insertArr, function(insertRe) {
				if (insertRe.affectedRows) {
					res.json(200, {
						msg: "注册成功，请登录",
						code: "1"
					});
				} else {
					res.json(200, {
						msg: "注册失败",
						code: "-1"
					})
				}
			});
		}
	});
});

// 登录
router.post(path_url.login, function(req, res) {

	var username = req.body.username;
	var password = req.body.password;
	// 当前的一条数据
	var sql = "select * from user where username=? and password=?";
	var selectArr = [username, password];
	crud.sqlCRUD(sql, selectArr, function(result) {
		if (result.length > 0) {
			res.json(200, result);
		} else {
			res.json(200, {
				msg: "用户名或密码错误",
				code: "400"
			})
		}

	})
});



module.exports = router;