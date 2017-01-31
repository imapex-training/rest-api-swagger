'use strict'

var Restaurants = require('./restaurants.model');

module.exports = {
    indexMean: indexMean,
    createMean: createMean
};

function indexMean(req, res) {

  Restaurants.find(function (err, contents) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(contents);
  });
}

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
