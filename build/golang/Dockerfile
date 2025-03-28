FROM golang:1.24.1-bullseye
ARG username=devcontainer
ARG useruid=1001
ARG usergid=${useruid}
ARG workdir=/go/src/

WORKDIR ${workdir}

RUN apt-get update && \
    apt-get -qq install -y --no-install-recommends \
    vim \
    tini  \
    curl \
    git \
    zip \
    unzip \
    wget \
    sudo \
    ssh

# create node user and group, then create app dir
RUN groupadd --gid ${usergid} ${username} && \
    useradd --uid ${useruid} --gid ${username} --shell /bin/bash --create-home ${username} && \
    chown -R ${username}:${username} ${workdir} && \
    echo ${username} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${username} && \
    chmod 0440 /etc/sudoers.d/${username}

ENV GOPATH=/home/${username}/go
ENV PATH=${PATH}:/usr/local/go/bin
ENV PATH=${PATH}:/go/bin
ENV PATH=${PATH}:${GOPATH}/bin
ENV GO111MODULE on
USER ${username}
