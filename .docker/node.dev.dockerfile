FROM node:7
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
    babel-cli \
    nodemon \
    eslint \
    eslint-plugin-security \
    mocha \
    chai

RUN npm cache clean
RUN npm uninstall sqlite3
RUN npm cache clean
RUN npm install --dev sqlite3@3.1.4

COPY . $HOME

ENTRYPOINT ["npm", "start"]
