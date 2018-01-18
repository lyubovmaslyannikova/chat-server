const config = require('.'),
	mysql = require('mysql');  

exports.getConnection = function() {
	return mysql.createConnection({
		host: config.get('database:host'),
		user: config.get('database:user'),
		password: config.get('database:password'),
		database: config.get('database:name'),
	}); 
}
