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
    yarn \
    node-gyp \
    node-pre-gyp \
    babel-cli \
    nodemon \
    eslint \
    eslint-plugin-security \
    mocha \
    chai

RUN npm cache clean
RUN yarn
RUN yarn remove sqlite3
RUN npm cache clean
RUN yarn add sqlite3@3.1.4 --dev
RUN yarn

COPY . $HOME

ENTRYPOINT ["yarn", "start"]
