FROM node AS builder

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

COPY ./docker/prod/conf.d /etc/nginx/conf.d

WORKDIR /app

COPY --from=builder /app/build ./public