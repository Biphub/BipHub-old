FROM node:7
MAINTAINER Jason Shin

ENV CORE $HOME/core
RUN mkdir $CORE
WORKDIR $CORE

# Install packages using NPM / Yarn trick
# ADD package.json /tmp/package.json
# ADD yarn.lock /tmp/yarn.lock
# RUN cd /tmp && yarn
# RUN mkdir -p /core && cd /core && ln -s /tmp/node_modules
# RUN mkdir -p $CORE && cp -a /tmp/node_modules $CORE

# Install packages without NPM trick
COPY package.json $CORE
COPY yarn.lock $CORE
RUN yarn

# Finally add remaining project source code to the docker container
ADD . $CORE

# Exposing default project port
EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
