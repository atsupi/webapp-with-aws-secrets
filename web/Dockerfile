FROM node:16-alpine
USER root

ENV NODE_ENV=dev

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install

COPY ./views ./views
COPY ./public ./public
COPY ./*.js ./
COPY ./.env ./

EXPOSE 3000

CMD ["node", "index.js"]
