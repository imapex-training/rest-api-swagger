If you try to execute the API, however, you'll receive an error in your terminal:

```
Error: Response validation failed: void does not allow a value
```

This is because our Swagger file does not include a definition for the resulting object, and so it's rejecting the result.
