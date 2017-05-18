```
$ docker pull mongo
```

To run the container we just pulled, and run it in daemon mode (`-d`):

```
$ docker run --name restaurants -p 27017:27017 -d mongo
```

