const express = require('express'),
	connection = require('../config/mysql').getConnection();

const router = express.Router();

router.use((res, req, next) => {
	// checkAuth
	next();
});
 
router.route('/')
	.get((req, res) => {
		const query = 'select id, name, description from rooms';

		connection.query(query, function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	})
	.post((req, res) => {
		const query = 'insert into rooms(name) values (?)';   

		connection.query(query, [req.body.name], function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	});

router.route('/:id')
	.get((req, res) => {
		let query = 'select ms.id, content, users.username, ms.date from messages as ms left join users on ms.user = users.id where room = ?'; 

		connection.query(query, [req.params.id], function(err, results) {
			if (err) {
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	})
	.put(function(req, res) {
		const query = '';   

		connection.query(query, function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	})
	.delete(function(req, res) {
		const query = 'delete from rooms where id=?';   

		connection.query(query, [req.params.id], function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	});

module.exports = router;
