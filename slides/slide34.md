To address this, we must define a schema definition for the restaurants object the `index` is sending back to the server.

```
      responses:
        200:
          description: An array of restaurants
          schema:
            $ref: "#/definitions/Restaurants"
```

```
definitions:
  Restaurants:
    items:
      $ref: "#/definitions/Restaurant"
  Restaurant:
    properties:
      name:
        type: string
      address:
        type: string
```
