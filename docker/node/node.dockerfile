FROM node:lts-alpine

# Create app directory
WORKDIR /app


RUN npm install nodemon -g

# Install app dependencies
COPY ./api_recomendations/package*.json ./

RUN npm install

COPY ./api_recomendations .

CMD [ "nodemon","-L", "main.js" ]