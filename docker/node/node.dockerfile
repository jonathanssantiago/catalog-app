FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./api_recomendations/package*.json ./

RUN npm install

COPY ./api_recomendations .

CMD [ "npm", "run", "dev" ]