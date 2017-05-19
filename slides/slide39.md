### Copy the following into your own `Dockerfile`:

```
FROM node:5.11.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./node_modules /usr/src/app/node_modules
COPY ./api /usr/src/app/api
COPY ./config /usr/src/app/config
COPY ./app.js /usr/src/app/

EXPOSE 10010

CMD ["node", "app.js"]
```
