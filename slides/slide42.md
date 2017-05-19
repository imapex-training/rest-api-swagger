## Running

Once you've successfully created the container, now you can (finally) run it! Please note you need to map the port defined in the EXPOSE statement from the Dockerfile, to a port in the host (in this case we will use host port 8080).

```
docker run -p 8080:10010 -d --name swagger-default {yourDockerName}/rest-api-swagger:latest
```
