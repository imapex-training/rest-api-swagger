We have to refactor the `restaurants.mean.js` controller to interact with MongoDB.

Import the model near the top of the file (Line 3):

`var Restaurants = require('./restaurants.model');`

Replace the contents of the `indexMean` function with the following:

```
Restaurants.find(function (err, contents) {
  if(err) { return handleError(res, err); }
  return res.status(200).json(contents);
});
```
