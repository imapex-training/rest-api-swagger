In the `app.js`, you need to add the Mongoose ODM (Object Document Mapper) package.

Insert at line 6:

```
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
```
