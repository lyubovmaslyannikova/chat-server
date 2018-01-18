const express = require('express');
const config = require('./config'); 
const bodyParser = require('body-parser');

const roomsRouter = require('./routers/rooms'); 
const messagesRouter = require('./routers/messages'); 

const app = express();
const port = config.get('port');

app.use(function(req, res, next) { 
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
	res.setHeader('Access-Control-Allow-Credentials', true); 

	next();
});  

app.use(bodyParser.json());

app.use('/rooms', roomsRouter);
app.use('/messages', messagesRouter);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Error');
});
 
app.listen(port, () => {
	console.log('http://localhost:' + port);
});
