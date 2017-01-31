'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

// Use the Mongoose ORM for modeling your objects in MongoDB
var mongoose = require('mongoose');

// Declare the database connection
var db = mongoose.connection;

// If no MONGO environment variable exists, default to localhost
if (!process.env.MONGO) {
  process.env.MONGO = "mongodb://localhost:27017/restaurants";
}

// Connect to the database using the environment variable
// process.env.MONGO
mongoose.connect(process.env.MONGO);

// Listen for events from Mongoose
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB Connected");
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
