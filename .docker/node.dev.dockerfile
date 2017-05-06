FROM node:7
MAINTAINER Jason Shin

ADD package.json yarn.lock /tmp/
ADD .yarn-cache.tgz /

# Install packages
RUN cd /tmp && yarn
RUN mkdir -p /core && cd /core && ln -s /tmp/node_modules

COPY . /core
WORKDIR /core

ENV FORCE_COLOR=1

ENTRYPOINT ["yarn", "start"]
