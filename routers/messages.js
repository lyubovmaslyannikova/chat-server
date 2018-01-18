const express = require('express'),
	connection = require('../config/mysql').getConnection();

const router = express.Router();

router.use((res, req, next) => {
	// checkAuth
	next();
});

router.route('/')
	.post((req, res) => {
		let query = 'insert into messages(room, user, content) values(?, ?, ?)'; 

		connection.query(query, [req.body.room, req.body.user, req.body.content], function(err, results) {
			if (err) { 
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	});

router.route('/:id')
	.put((req, res) => {
		let query = 'update messages(content) set message = ? where id = ?'; 

		connection.query(query, [req.body.message, req.params.id], function(err, results) {
			if (err) {
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	})
	.delete((req, res) => {
		let query = 'delete from messages where id = ?';

		connection.query(query, [req.params.id], function(err, results) {
			if (err) {
				res.status(500).send(`${err.code}: ${err.sqlMessage}`);
				return;
			}

			res.json(results);
		});
	});

module.exports = router;
