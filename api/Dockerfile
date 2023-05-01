FROM node:16-alpine

ENV NDOE_ENV=prod
ENV WEBORIGIN=http://web.aws-multi-container-example.local:3000

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install

COPY ./index.js ./

EXPOSE 3001

CMD ["node", "index.js"];
