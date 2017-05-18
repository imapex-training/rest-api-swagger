Copy the content below into `restaurants.js`.

```javascript
'use strict'


module.exports = {
    index: index
};

function index(req, res) {

    var restaurants = [
	{
	    name: 'Bar Americano',
	    address: '20 Presgrave Pl, Melbourne VIC 3000, Australia'
	},
	{
	    name: 'Ronchi 78',
	    address: 'Via S. Maurilio, 7, 20123 Milano, Italy'
	}
    ];

    res.json(restaurants);
}
```
