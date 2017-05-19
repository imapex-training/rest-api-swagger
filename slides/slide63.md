Add a new function in the controller.

```
module.exports = {
    indexMean: indexMean,
    createMean: createMean
};

...

// Around Line 19

function createMean(req, res) {

  var newRestaurant = {
    name: req.body.name,
    address: req.body.address
  }

  Restaurants.create(newRestaurant, function(err, content) {
    if(err) { return handleError(res, err); }
    // console.log(content);
    return res.status(201).json(content);
  });
}
```
