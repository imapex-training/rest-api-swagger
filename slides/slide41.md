### Example Output:

```
$ docker build -t {yourDockerName}/rest-api-swagger:latest .
Sending build context to Docker daemon 21.62 MB
Step 1 : FROM node:5.11.1
 ---> 6300cb2bfbd4
Step 2 : RUN mkdir -p /usr/src/app
 ---> Using cache
 ---> 5debad5860e3
Step 3 : WORKDIR /usr/src/app
 ---> Using cache
 ---> c4bb661d8b4e
Step 4 : COPY ./node_modules /usr/src/app/node_modules
 ---> 1d4cf05a352c
Removing intermediate container 091973c7c2f0
Step 5 : COPY ./api /usr/src/app/api
 ---> 4d0b1f9fcdce
Removing intermediate container aa5dfc98f47b
Step 6 : COPY ./config /usr/src/app/config
 ---> 10f29df9826f
Removing intermediate container 4dc514fa2b38
Step 7 : COPY ./app.js /usr/src/app/
 ---> 2eb107679e2b
Removing intermediate container 42bb3f8c557e
Step 8 : EXPOSE 10010
 ---> Running in 87700f63405f
 ---> fc0956d4defc
Removing intermediate container 87700f63405f
Step 9 : CMD node app.js
 ---> Running in a457c180a38a
 ---> 40b0c52b1e35
Removing intermediate container a457c180a38a
Successfully built 40b0c52b1e35
```
