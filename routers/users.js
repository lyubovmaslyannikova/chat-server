const express = require('express'),
	connection = require('../config/mysql').getConnection();

const router = express.Router();

router.use((res, req, next) => {
	// checkAuth
	next();
});

module.exports = router;
