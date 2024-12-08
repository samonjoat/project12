FROM node:20.18.0-slim as base
WORKDIR /app

FROM base as build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python-is-python3

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as stage-2
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf