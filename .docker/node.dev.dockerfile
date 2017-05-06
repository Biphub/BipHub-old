FROM node:7
MAINTAINER Jason Shin

ENV CORE=$HOME/core

RUN mkdir $CORE

COPY yarn.lock $CORE
# Copying over package.json because we are downgrading sqlite3 to 3.1.4 to be compatible with node:7
COPY package.json $CORE

WORKDIR $CORE

# If yarn install fails because of networking issue, try restarting docker-machine
RUN yarn

# SQLITE 3 installation trick on Node:6
RUN yarn upgrade sqlite3@^3.1.4

COPY . $CORE

ENTRYPOINT ["yarn", "start"]
