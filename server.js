const express = require('express'); 
var bodyParser = require('body-parser');
const config = require('./config');
const mysql = require('mysql'); 

const app = express();  
const port = config.get('port');

const connection = mysql.createConnection({
	host: config.get('database:host'),
	user: config.get('database:user'),
	password: config.get('database:password'),
	database: config.get('database:name'),
}); 

app.use(function(req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
}); 

app.use(bodyParser.json());

app.route('/rooms')
	.get(function(req, res) {
		const query = 'select id, name, description from rooms';

		connection.query(query, function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	})
	.post(function(req, res) {
		const query = 'insert into rooms(name) values (?)';   

		connection.query(query, [req.body.name], function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	});

app.route('/rooms/:id') 
	.get(function(req, res) {
		let query = 'select ms.id, content, users.username, ms.date from messages as ms left join users on ms.user = users.id where room = ?'; 

		connection.query(query, [req.params.id], function(err, results) {
			if (err) {
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	})
	.put(function(req, res) {
		const query = '';   

		connection.query(query, function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	})
	.delete(function(req, res) {
		const query = 'delete from rooms where id=?';   

		connection.query(query, [req.params.id], function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	});

app.route('/messages') 
	.post(function(req, res) {
		let query = 'insert into messages(room, user, content) values(?, ?, ?)'; 

		connection.query(query, [req.body.room, req.body.user, req.body.content], function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	});

app.route('/messages/:id')
	.put(function(req, res) {
		let query = 'update messages(content) set message = ? where id = ?'; 

		connection.query(query, [req.body.message, req.params.id], function(err, results) {
			if (err) {
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	})
	.delete(function(req, res) {
		let query = 'delete from messages where id = ?';

		connection.query(query, [req.params.id], function(err, results) {
			if (err) {
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
			}

			res.json(results);
		});
	});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Error');
});
 
app.listen(port, () => {
	console.log('http://localhost:' + port);
});
