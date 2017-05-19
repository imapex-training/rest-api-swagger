At Line 32 in the `swagger.yaml`, add a new route.

```
# swagger.yaml
/restaurants-mean:
  x-swagger-router-controller: restaurants.mean
  get:
    summary: Displays all of the restaurants available from Mongo
    description: Displays all of the restaurants available.  These restaurants are fantastic.
    operationId: indexMean
    responses:
      200:
        description: An array of restaurants
        schema:
          $ref: "#/definitions/Restaurants"
```
