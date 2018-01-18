const express = require('express'),
	router = express.Router();
 
router.get('/', function(req, res) {
	const query = 'select id, name, description from rooms';

	connection.query(query, function(err, results) {
		if (err) { 
			res.status(500).send(`${err.code}: ${err.sqlMessage}`);
		}

		res.json(results);
	});
});

router.post('/', function(req, res) {
	const query = 'insert into rooms(name) values (?)';   

	connection.query(query, [req.body.name], function(err, results) {
		if (err) { 
			res.status(500).send(`${err.code}: ${err.sqlMessage}`);
		}

		res.json(results);
	});
});

router.route('/rooms/:id') 
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

module.exports = router;
