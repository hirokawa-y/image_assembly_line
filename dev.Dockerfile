ARG NODE_VERSION

FROM node:$NODE_VERSION-slim AS base

FROM summerwind/actions-runner:v2.277.1 AS dev
USER root
RUN mkdir -p /certs/client && \
    touch /certs/client/ca.pem && \
    touch /certs/client/cert.pem && \
    touch /certs/client/key.pem && \
    chmod o+r -R /certs

COPY --from=node /usr/local/bin/ /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
USER runner
WORKDIR /app
COPY --chown=runner . .

RUN npm install
