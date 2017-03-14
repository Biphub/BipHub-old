FROM node:latest
MAINTAINER Jason Shin

WORKDIR /home

COPY . /home

RUN apt-get update && apt-get install -y \
    sudo \
    build-essential \
    python-software-properties \
    python \
    g++ \
    make

RUN npm install -g \
    node-gyp \
    node-pre-gyp \
    babel-cli \
    nodemon \
    better-npm-run

RUN npm cache clean
RUN npm install --no-bin-links
RUN npm uninstall sqlite3
RUN npm cache clean &&
RUN npm install sqlite3@3.1.4

ENTRYPOINT ["npm", "run", "dev"]