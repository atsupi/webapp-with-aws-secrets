FROM node:16-alpine
USER root

ENV NODE_ENV=prod

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./index.js ./

EXPOSE 3000

CMD ["node", "index.js"]
