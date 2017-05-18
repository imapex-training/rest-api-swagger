```
paths:
  /restaurants:
    x-swagger-router-controller: restaurants
    get:
      summary: Displays all of the restaurants available
      description: Displays all of the restaurants available.  These restaurants are fantastic.
      operationId: index
      responses:
        200:
          description: An array of restaurants
```
