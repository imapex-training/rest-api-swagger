# Introduction and Purpose

The purpose of this tutorial is to help the reader understand a method to quickly create a REST API, and to understand the process of creating an API starting first with the API definintion. We will use the Swagger definition language (aka the [OpenAPI Specification](http://swagger.io/specification/)) in this tutorial.

## Windows Users

This tutorial expects a Unix-like system, however where possible alternatives have been identified for Windows-based systems.  The Windows paths are less tested than the Unix-like paths.

# Prerequisites

* Nodejs (installed with nvm)
* swagger-node project
* Docker
* Basic knowledge of `git`

[item]: # (slide)
# Objectives of Project

* Learn about how to quickly build a REST API
* Package the REST API as a container
* Understand environment variables

[item]: # (/slide)

# Source code

Source code is available for you as a resource as you work through this tutorial. You can clone the repository using the following command: `git clone <repo>`.

Once you have cloned the repository, in subsequent steps, instructions will be provided at the end of the instructions for you to checkout a portion of the code project that corresponds to the material in the step. This can help you "catch up" in certain sections if you get behind or stuck.  

You can check out any point of the tutorial using `git checkout -b step? step?`.

To see the changes which between any two lessons use the `git diff command`. `git diff step-?..step-?`.

# Step 0: Installing Prerequisites

We're going to use the [NodeJS](https://nodejs.org) environment to build our project.  However, we're not going to build the application from scratch, but instead use a few frameworks to speed up the process. Frameworks are common in application development to remove a lot of the boilerplate code that you might write over-and-over again. In particular, this project will leverage the [swagger-node](https://github.com/swagger-api/swagger-node) project, which itself uses a web application framework called [expressjs](https://expressjs.com).

* Install NodeJS using [nvm (node version manager)](https://github.com/creationix/nvm). Windows users can use: [nvm-windows](https://github.com/coreybutler/nvm-windows). Mac users can download node and npm from [here] (https://nodejs.org/en/) 
* Install [swagger-node](https://github.com/swagger-api/swagger-node)
* Install [Docker for Mac](https://docs.docker.com/engine/installation/mac/) or [Docker for Windows](https://docs.docker.com/engine/installation/windows/)

[item]: # (slide)
# Step 1: Create swagger-node project

* Install the swagger-node dependencies
* Create swagger-node project
* Initialize `git` repository

[item]: # (/slide)

## Exercise

* `$ npm install -g swagger`: Installs the swagger framework globally

**If you cloned the repository from git, you can skip these steps:**

* `$ swagger project create rest-api-swagger`: Scaffolds the entire project in a newly created `rest-api-swagger` directory. You will be asked for what Framework you would like to use (connect, express, hapi, restify or sails)
* `$ cd rest-api-swagger`
* `$ git init`: Initialize the git repo for this project


[item]: # (slide)
# Step 2: Exploring the project layout

* Learn about the `swagger-node` project
* Learn about the project layout
* `controllers` directory
* `swagger` directory

[item]: # (/slide)

## Exercise

Swagger-node will create a template project, which you can then customize to your needs. Observe that there is an `api` directory, that contains folders for `controllers`, `helpers`, `mocks`, `swagger`, and others.

For the purposes of this tutorial, let's focus our attention on `controllers` and `swagger`:

* `controllers`: ExpressJS is a Model-View-Controller web framework. The Controller is basically the business logic for the app, where the View is what you ultimately consume as a web page, and Model defines the objects that would be referenced in your View and Controller. In short, the Controller is somewhat like the glue between the Model and View.

* `swagger`: This directory holds the `swagger.yaml` file, which provides the definition for your REST API. We will manipulate this file quite a bit using the Swagger Editor.


```
├── README.md
├── api
│   ├── controllers
│   │   ├── README.md
│   │   └── hello_world.js
│   ├── helpers
│   │   └── README.md
│   ├── mocks
│   │   └── README.md
│   └── swagger
│       └── swagger.yaml
├── app.js
├── config
│   ├── README.md
│   └── default.yaml
├── package.json
└── test
    └── api
        ├── controllers
        │   ├── README.md
        │   └── hello_world.js
        └── helpers
            └── README.md
```


## Help
If you are stuck, you can use `git checkout -b step2 step2` to reset the project in the right place.

[item]: # (slide)
# Step 3: Run the project

* Learn about the `swagger-node` project and CLI
* `swagger project start`
* `swagger project edit`

[item]: # (/slide)

## Swagger-node CLI
Swagger-node provides convenient CLI commands to help you run the project, edit the Swagger file using swagger editor, and test your API.

```
    create [options] [name]              Create a folder containing a Swagger project
    start [options] [directory]          Start the project in this or the specified directory
    verify [options] [directory]         Verify that the project is correct (swagger, config, etc)
    edit [options] [directory]           open Swagger editor for this project or the specified project directory
    open [directory]                     open browser as client to the project
    test [options] [directory_or_file]   Run project tests
    generate-test [options] [directory]  Generate the test template
```


## Exercise

* Open another terminal windows or tab
* In the new terminal, change to the project directory
* Execute the command `swagger project start`
* Open a third terminal window or tab and execute the command `curl http://127.0.0.1:10010/hello` to test that the initial REST API is working correctly (it should return "Hello, stranger!")
* In the first terminal window, execute the command `swagger project edit`

In the window where you entered the command `swagger project start`, you should see console output:

```
Starting: /Users/<username>/src/rest-api-swagger/app.js...
  project started here: http://localhost:10010/
  project will restart on changes.
  to restart at any time, enter `rs`
try this:
curl http://127.0.0.1:10010/hello?name=Scott

```

In the window where you entered the command `swagger project edit`, you should see this console output, and your browser should have loaded the editor.

```
Starting Swagger Editor.
Opening browser to: http://127.0.0.1:50391/#/edit
Do not terminate this process or close this window until finished editing.
```

![Editor](docs/editor.png)


[item]: # (slide)
# Step 4: Understand the project and development process

* Learn about the basics of a Swagger file
* Learn about YAML
* Learn about `paths` and `definitions` sections

[item]: # (/slide)

[item]: # (slide)
![](https://github.com/swagger-api/swagger-node/raw/master/docs/images/overview2.png)
(Source: Swagger-node project)

[item]: # (/slide)

It's important to realize that the Swagger file is the focal point of the process. You are working in an API-definition-first model, and adding business logic to your code as a result of what you define in the Swagger file.

## Swagger file details

In order to effectively work with the Swagger definition, it's useful to know more about the relevant parts of the file. If you want to learn about all of the possible options in an OpenAPI specification, you can go [here](http://swagger.io/specification/). OpenAPI files can be in JSON or [YAML format](http://yaml.org). The format that we will work in is YAML. If you're not familiar with YAML, it's a key-value based file format that is easy to read for humans.

Beginning section: Everything stems from the root "Swagger object". Before defining the methods of your API, the Swagger file can provide some overall information about your API including: The Swagger version, `info`, `host`, `basePath`, `schemes`, `consumes`, and `produces`.

`paths` section: This object describes the REST API paths that your application will expose to the world.

`definitions` section: This object describes the objects that will be sent into your API methods or returned by your API methods.  It is used by the swagger "middleware" to validate what is being provided to and returned from the API.


[item]: # (slide)
# Step 5: Creating a new API

* Learn about the basic elements of adding a path to the Swagger file
* Add a `/restaurants` path to the Swagger file using snippet

[item]: # (/slide)

Notice that there is an existing endpoint called `/hello`, also called a "path object". It includes an "operation object" ,`get` , which contains two fields: `parameters` and `responses`.

```
paths:
  /hello:
    get:
    		...
    	parameters:
    		...
    	responses:
    		...
```

## Exercise

Let's add a new API. In the Swagger editor, which should be a tab in your open web browser already, add a new API called `/restaurants`.

![](docs/create-new-api-1.png)

Once you have added the `path` named `/restaurants:`, hit RETURN, and then TAB.  

![](docs/create-new-api-2.png)

Start typing the word `get`. You'll noticed that you are presented with an autocomplete option. Hit TAB to autocomplete the snippet.

![](docs/create-new-api-3.png)

This is great, however there are a couple of errors to resolve.

Add some text to the `summary` and `description` fields.

```
  /restaurants:
    get:
      summary: Displays all of the restaurants available
      description: Displays all of the restaurants available.  These restaurants are fantastic.
      responses:
        200:
          description: OK
```

## Help
If you are stuck, you can use `git checkout -b step5 step5` to reset the project in the right place.

[item]: # (slide)
# Step 6: Wiring up the controller

* Add `x-swagger-router-controller: restaurants`
* Add `operationId: index`
* Add `api/controllers/restaurants.js`
* Add `function index({})` to `restaurants.js`
* Add object definitions to Swagger file

[item]: # (/slide)

From the third terminal window or tab you opened run the command `curl http://127.0.0.1:10010/restaurant` and you will see it is not working yet. At this point, you have an API displaying in the Swagger editor, but it doesn't do anything. If you use the Swagger editor to try it out, you'll just get an error.

In order for your REST API to do something interesting, you need to wire it to a controller. The Swagger spec defines an `operationId` field, and the swagger-node project has extended the Swagger spec to also include a reference to the controller via the `x-swagger-router-controller` field.

## Exercise

Add the following to your Swagger file:

* `x-swagger-router-controller: restaurants`
* `operationId: index`

The next step is to create the controller in your project.

In the terminal, and within your project (`rest-api-swagger`), create a file named `restaurants.js` in the path `api/controllers/`.

Open `restaurants.js` in a text editor. Recall that in the Swagger file, there were two fields: `x-swagger-router-controller` and `operationId`. We've already created the controller file, now we need to complete the `operationId`. Since the value of the `operationId` corresponds to `index`, we need to add a function called `index` in `restaurants.js`.

Copy the content below into `restaurants.js`.


```
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

If you try to execute the API from the third terminal window or tab (`curl http://127.0.0.1:10010/restaurants`), you will receive the following error:
`Error: Response validation failed: void does not allow a value`

This is because our Swagger file does not include a definition for the resulting object, and so it's rejecting the result.

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

Now, if you go to the third terminal window or tab and run the command `curl http://127.0.0.1:10010/restaurants` you will receive the correct answer with a JSON file including info on the 2 options:

[{"name":"Bar Americano","address":"20 Presgrave Pl, Melbourne VIC 3000, Australia"},{"name":"Ronchi 78","address":"Via S. Maurilio, 7, 20123 Milano, Italy"}]

When you have checked that everything is working as expected, and you are receiving the correct list of restaurants, please go to your second terminal window or tab (the one where you ran the "swagger project start") and type CTRL+C to stop the project. The command `curl http://127.0.0.1:10010/restaurants` should now return an error like "curl: (7) Failed to connect to 127.0.0.1 port 10010: Connection refused".

## Help
If you are stuck, you can use `git checkout -b step6 step6` to reset the project in the right place.

[item]: # (slide)
# Step 7: Deploying into Docker

* Create a `Dockerfile`
* Learn about `docker run`, `docker stop`

[item]: # (/slide)

You may have heard of Docker before. In general, Docker is a way to run an application on a system in a "container". This means that you can package all of your application and its dependencies into a logical grouping. Containers are different from a VM in that they don't include another kernel within the container. Your application is interacting with the kernel of the computer you are running it on.

## Exercise

This exercise assumes you reviewed the prerequisites, and installed the Docker runtime on your workstation. In order to package your application and its dependencies into a container, you need to create a `Dockerfile` at the root of the project (e.g., `rest-api-swagger/Dockerfile`). Then, you will "build" the container and "run" the container.

A `Dockerfile` has several key components and made up of a series of commands. It's a bit like a batch script in that sense.  

* First, you need to tell Docker from which image you want to inheret. This saves you the trouble of having to create all of the dependencies by hand.  To do this, you use the `FROM` statement.
* Then, you will supply a series of additional commands to copy your application and its dependencies into the container. This will be a combination of `RUN` and `COPY`.
* You will also need to tell Docker in which directory to look for your app. To do this, you use the `WORKDIR` statement.
* If you want to communicate with your application over a known port, you need to use the `EXPOSE` statement, so that the container makes the port available to the run-time engine.
* Finally, to run your application (or script), you will use the `CMD` statement.

Copy the following into your own `Dockerfile`:

```
# Dockerfile
FROM node:5.11.1

# Create app directory
RUN mkdir -p /usr/src/app

# Establish where your CMD will execute
WORKDIR /usr/src/app

# Install app dependencies

# Note: If you were using a build server, you would do this outside of the
# container, along with tests, and copy the resulting node_modules directory into
# the container.  Since we are just using our local machines, and already have
# downloaded the dependencies, we copy them in the next step.

# COPY package.json /usr/src/app/
# RUN npm install

# Bundle app source into the container
COPY ./node_modules /usr/src/app/node_modules
COPY ./api /usr/src/app/api
COPY ./config /usr/src/app/config
COPY ./app.js /usr/src/app/

# Expose the port for the app
EXPOSE 10010

# Execute "node app.js"
CMD ["node", "app.js"]
```

Note that we're using `CMD ["node", "app.js"]` as opposed to `CMD ["swagger", "project", "start"]`.  To run this app in production, it's recommended to use the `node app.js` method to start the app.

## Building

To actually create the container, you need to `build` the container.  Therefore, you will execute the following command:

`docker build -t ciscodevnet/rest-api-swagger:latest .`

```
$ docker build -t ciscodevnet/rest-api-swagger:latest .
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

## Running

Once you've successfully created the container, now you can (finally) run it! Please note you need to map the port defined in the EXPOSE statement from the Dockerfile, to a port in the host (in this case we will use the same port 10010).

`docker run -p 10010:10010 -d --name swagger-default ciscodevnet/rest-api-swagger:latest`

You should be able to view the result by opening `http://localhost:10010/restaurants` in a browser, or running the command `curl http://127.0.0.1:10010/restaurants` from a terminal window.

## Stopping

To stop your container execute the `docker stop` command.

`docker stop swagger-default`

## Help
If you are stuck, you can use `git checkout -b step7 step7` to reset the project in the right place.

[item]: # (slide)
# Step 8: Bonus: Docker Makefile

* Learn about how a `Makefile` provides convenience to dev process
* Learn about `Makefile` variables
* Learn about how to pass environment variables and an environment variable file to the `docker` commands

[item]: # (/slide)

It can be tiresome to remember the `docker` commands and syntax.  Creating a `Makefile`, can help remove some of the typos and mundane activites as you work through a project like this.  With a `Makefile`, you can simply type `make` or `make run` in order to build and run your project, respectively.

## Exercises

Create a new file called `Makefile` in the root of the project directory.

In the `Makefile` contents below, notice that there are a few variables that are set at the top in all caps.  These variable names are mostly taken from the Docker nomenclature for Docker Registries and documentation:

* `NS`: stands for namespace
* `VERSION`: you can set the version of the container that is created or started
* `REPO`: The container repo name
* `NAME`: The shorthand name of the container
* `INSTANCE`: An instance name for the container (not totally necessary, but included for more advanced use cases)
* `PORTS`: The port flag that sets which maps the exposed port to the port on your workstation


```
NS = ciscodevnet
VERSION ?= latest

REPO = rest-api-swagger
NAME = swagger
INSTANCE = default
PORTS = -p 8080:10010

.PHONY: build push shell run start stop rm release

build:
	docker build -t $(NS)/$(REPO):$(VERSION) .

push:
	docker push $(NS)/$(REPO):$(VERSION)

shell:
	docker run --rm --name $(NAME)-$(INSTANCE) -i -t $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION) /bin/bash

run:
	docker run --rm --name $(NAME)-$(INSTANCE) $(LINK) $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION)

start:
	docker run -d --name $(NAME)-$(INSTANCE) $(PORTS) $(LINK) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION)

stop:
	docker stop $(NAME)-$(INSTANCE)

rm:
	docker rm $(NAME)-$(INSTANCE)

release: build
	make push -e VERSION=$(VERSION)

default: build

```

The `default` make command is to execute `docker build`.  The difference between `make run` and `make start` is that `make start` will daemonize the container, so that it will be running in the background.  The `make shell` command will execute your container, but drop you into the bash shell.  This is very useful for troubleshooting your container via the command line.  You can execute typical bash commands like `ls -l`, check for the existence of environment variables, or run your app manually.

## Environment Variables

It's possible (and highly recommended if you're following the 12factor app patterns) to pass environment variables into your container when it is loaded.  You can do this with the `-e` flag.  If you find yourself using many environment variables, it is more convenient in your development environment to create a file on your workstation containing all of your environment variables.  The format is quite simple, where you define all of your dev environment variables in the standard key-value format (KEY=variable).  You can then use the `--env-file` flag to pass in your environment variables into the container at runtime (`--env-file=./my-vars`).  In the `Makefile`, you can set the `ENV` variable then to `--env-file=./<yourfile>`.

## Help
If you are stuck, you can use `git checkout -b step8 step8` to reset the project in the right place.


[item]: # (slide)
# Go Do It Exercises

* The API doesn't have a notion of persistance.  Using the mongoose ORM, try to add database connectivity to the application.

[item]: # (/slide)

[item]: # (slide)
# Links to Explore

* https://swaggerhub.com
[item]: # (/slide)

# License

Unless noted otherwise, this tutorial is provided under the [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) license, and any sample code is licensed under [Apache 2.0](LICENSE.md).
