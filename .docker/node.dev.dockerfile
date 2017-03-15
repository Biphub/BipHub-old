FROM node:6
MAINTAINER Jason Shin

ENV HOME=/home

COPY package.json $HOME

WORKDIR /home

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
    better-npm-run \
    eslint \
    eslint-config-airbnb-base \
    install-peerdeps \
    eslint-plugin-security \
    mocha \
    chai

RUN install-peerdeps --dev eslint-config-airbnb-base

RUN npm cache clean
RUN npm install
RUN npm uninstall sqlite3
RUN npm cache clean
RUN npm install sqlite3@3.1.4
RUN npm install --only=dev

COPY . $HOME
