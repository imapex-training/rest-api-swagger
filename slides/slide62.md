```
post:
  summary: Create a new restaurant entry
  description: Create a new restaurant entry
  operationId: createMean
  parameters:
    - name: restaurant
      in: body
      required: true
      description: Restaurant Object
      schema:
        $ref: "#/definitions/Restaurant"         
  responses:
    201:
      description: OK
      schema:
        $ref: "#/definitions/Restaurant"
```
