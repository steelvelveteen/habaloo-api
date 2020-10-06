FROM node:12.18.1

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

ADD .  /usr/src
RUN npm run build-ts

COPY . .

EXPOSE 8080

CMD [ "node", "dist/server.js"]