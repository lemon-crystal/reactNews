var mysqlObj = require("./config");
var mysqlConn = require("mysql");

var Conn = {
	Client: mysqlConn.createConnection(mysqlObj)
}

module.exports = Conn;