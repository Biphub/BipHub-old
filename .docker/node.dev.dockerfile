FROM node:7
MAINTAINER Jason Shin

ENV CORE /home/node/app
RUN mkdir $CORE
RUN echo $CORE
WORKDIR $CORE

# Install packages using NPM / Yarn trick
# COPY package.json /tmp/package.json
# COPY yarn.lock /tmp/yarn.lock
# RUN cd /tmp && yarn
# RUN cp -a /tmp/node_modules $CORE && cd $CORE

# Install packages without NPM trick
COPY package.json $CORE
COPY yarn.lock $CORE
RUN yarn

# Finally add remaining project source code to the docker container
ADD . $CORE

# Exposing default project port
EXPOSE 8080
EXPOSE 56745

CMD ["npm", "run", "dev"]
