FROM node:6
MAINTAINER Jason Shin

ENV HOME=/home

COPY yarn.lock $HOME
COPY package.json $HOME

WORKDIR /home

RUN yarn

# SQLITE 3 installation trick on Node:6
RUN yarn upgrade sqlite3@^3.1.4

COPY . $HOME

ENTRYPOINT ["yarn", "start"]
