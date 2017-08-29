Biphub - Connecting games and people together
==================================

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b9613dc9b4d647fbb9dc6d3b50832361)](https://www.codacy.com/app/JasonShin/BipHub?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JasonShin/BipHub&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/Biphub/BipHub.svg?branch=master)](https://travis-ci.org/Biphub/BipHub)
![Dependencies](https://david-dm.org/Biphub/BipHub.svg)

Note:

In development, make sure to change SERVER_URL inside docker-compose.dev.yml

This is a straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

> Tip: If you are using [Mongoose](https://github.com/Automattic/mongoose), you can automatically expose your Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).

Getting Started
---------------

```sh
# clone it
git clone git@github.com:developit/express-es6-rest-api.git
cd express-es6-rest-api

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
Docker Support
------
```sh
cd express-es6-rest-api

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

Docker Demo
-------------------------
It's supposed to be pretty easy to take your Docker to your favourite cloud service, here's a demo of what's our Dockerized bolierplate is like: [https://docker-deployment-yudfxfiaja.now.sh/api](https://docker-deployment-yudfxfiaja.now.sh/api)

License
-------

MIT
