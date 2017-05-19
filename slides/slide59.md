Insert the following into that file:

```
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: {
  	type: String,
  	required: true
  },
  address: {
  	type: String,
  	required: true
  }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
```
