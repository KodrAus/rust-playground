FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    jq \
    libssl-dev \
 && rm -rf /var/lib/apt/lists/*

ENV USER=root
ENV PATH=/root/.cargo/bin:$PATH
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y  && rustup toolchain uninstall stable
ADD Cargo.toml /root/Cargo.toml
ADD entrypoint.sh /root/
ADD fix-modification-time.sh /root/
