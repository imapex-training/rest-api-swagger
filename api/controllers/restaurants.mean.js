'use strict'

var Restaurants = require('./restaurants.model');

module.exports = {
    indexMean: indexMean
};

function indexMean(req, res) {

  Restaurants.find(function (err, contents) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(contents);
  });
}
