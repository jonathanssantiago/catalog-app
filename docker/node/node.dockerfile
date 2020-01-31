FROM node:lts-alpine

WORKDIR /app

COPY ./api_recomendations/package*.json .

RUN npm install

COPY ./api_recomendations .

CMD [ "npm", "run", "dev" ]