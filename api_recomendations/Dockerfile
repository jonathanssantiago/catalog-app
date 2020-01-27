FROM node:lts

# Create app directory
WORKDIR /app

RUN npm install nodemon -g

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "nodemon", "-L", "server.js" ]