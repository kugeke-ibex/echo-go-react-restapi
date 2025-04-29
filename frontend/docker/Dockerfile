#### base ####
# cache our node version for installing later
FROM node:23.11.0-slim as node
FROM ubuntu:plucky-20241213 as base
ARG username=devcontainer
ARG useruid=1001
ARG usergid=${useruid}
ARG workdir=/app
ARG PORT=3000

# Avoid running nodejs process as PID 1 (use tini)
# You may also need development tools to build native npm addons:
# apt-get install gcc g++ make
RUN apt-get update && \
    apt-get -qq install -y --no-install-recommends \
    tini  \
    curl \
    git \
    zip \
    unzip \
    wget \
    sudo \
    ssh \
    && \
    rm -rf /var/lib/apt/lists/*
EXPOSE ${PORT}

# new way to get node, let's copy in the specific version we want from a docker image
# this avoids depdency package installs (python3) that the deb package requires
COPY --from=node /usr/local/include/ /usr/local/include/
COPY --from=node /usr/local/lib/ /usr/local/lib/
COPY --from=node /usr/local/bin/ /usr/local/bin/
# reset symlinks
RUN corepack disable && corepack enable

# create node user and group, then create app dir
RUN groupadd --gid ${usergid} ${username} && \
    useradd --uid ${useruid} --gid ${username} --shell /bin/bash --create-home ${username} && \
    mkdir ${workdir} && \
    chown -R ${username}:${username} ${workdir} && \
    echo ${username} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${username} && \
    chmod 0440 /etc/sudoers.d/${username}

WORKDIR ${workdir}
USER ${username}
# COPY --chown=${username}:${username} package*.json yarn*.lock ./
# RUN npm ci --only=production && npm cache clean --force

#### dev ####
# no source to be added, and assumes bind mount
FROM base as dev
ENV NODE_ENV=development
ENV PATH=${workdir}/node_modules/.bin:$PATH
# RUN npm install --only=development && npm cache clean --force
# CMD ["nodemon", "index.js"]

#### source ####
FROM base as source
COPY --chown=${username}:${username} . .

#### test (as needed) ####
# FROM source as test
# ENV NODE_ENV=development
# ENV PATH=${workdir}/node_modules/.bin:$PATH
# COPY --from=dev ${workdir}/node_modules ${workdir}/node_modules
# RUN npx eslint .
# RUN npm test
# CMD ["npm", "run", "test"]

#### prod ####
# FROM source as prod
# ENV NODE_ENV=production
# ENTRYPOINT ["/usr/bin/tini", "--"]
# CMD ["node", "index.js"]