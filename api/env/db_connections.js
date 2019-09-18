const usersRoute = require('../routes/customer_data');

var mysql = require("mysql");
const express = require('express');
const app = express();

app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : ' ',
		database : 'mawmeow_data'
	});
	res.locals.connect();
	next();
});

app.use('/api/users', usersRoute);