var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var server = express();

var port = process.env.PORT || 8080;
var db = lowdb('db.json');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/todos', function (request, response){
  response.send('GET todos');
});

server.get('/todos/:id', function (request, response){
  response.send('GET todos :id');
});

server.post('/todos', function (request, response){
  response.send('POST todos');
});

server.put('/todos/:id', function (request, response){
  response.send('PUT todos :id');
});

server.delete('/todos/:id', function (request, response){
  response.send('DELETE todos :id');
});


server.listen(port);
