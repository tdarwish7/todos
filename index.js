var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var server = express();
var port = process.env.PORT || 8080;


server.listen(port);
