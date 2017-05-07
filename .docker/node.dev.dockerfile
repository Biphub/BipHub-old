FROM node:7
MAINTAINER Jason Shin

ENV CORE /core
RUN echo $CORE
RUN mkdir $CORE
WORKDIR $CORE

# Install packages using NPM / Yarn trick
COPY package.json /tmp/package.json
COPY yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn
# RUN cd $CORE && ln -s /tmp/node_modules
RUN cp -a /tmp/node_modules $CORE && cd $CORE

# Install packages without NPM trick
# COPY package.json $CORE
# COPY yarn.lock $CORE
# RUN yarn

# Finally add remaining project source code to the docker container
ADD . $CORE

# Exposing default project port
EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
