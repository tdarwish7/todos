
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

//import my model
var Todo = require('./models/todo.js');
var testTodo = new Todo('some stuff');
console.log(testTodo);
var port = process.env.PORT || 8080;
var db = lowdb('db.json');

// Database Initialization
  db.defaults({todos: []})
    .value(); //runs the previous set of commands

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/todos', function (request, response){
  var todos = db.get('todos')
                .value();
  response.send(todos);
});

server.get('/todos/:id', function (request, response){
  var todo = db.get('todos')
            .find({id: request.params.id})
            .value();
  response.send(todo);
});

server.post('/todos', function (request, response){
  var todo = new Todo(request.body.description);
  var result = db.get('todos')
                .push(todo)
                .last()
                .value();
  response.send(result);
});

server.put('/todos/:id', function (request, response){
  var todo = new Todo(request.body.description);
  todo.updateComplete(request.body.isComplete);

  var updatedTodo = db.get('todos')
                  .find({id: request.params.id})
                  .assign(todo)
                  .value();
  response.send(updatedTodo);
});

server.delete('/todos/:id', function (request, response){
  var todo = db.get('todos')
            .remove({id: request.params.id})
            .value();
  response.send(todo);
});

server.listen(port);
