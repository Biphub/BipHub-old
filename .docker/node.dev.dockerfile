FROM node:latest
MAINTAINER Jason Shin

WORKDIR /home

COPY . /home

RUN apt-get update &&
    apt-get upgrade &&
    apt-get install -y sudo &&
    apt-get install build-essential &&
    apt-get install -y python-software-properties python g++ make &&
    sudo npm install -g node-gyp node-pre-gyp &&
    npm install -g babel-cli nodemon better-npm-run &&
    npm cache clean &&
    npm install --no-bin-links &&
    npm uninstall sqlite3 &&
    npm cache clean &&
    npm install sqlite3@3.1.4

ENTRYPOINT["npm", "run", "dev"]