# estágio de compilação
FROM node:10.15.3-alpine as build-stage

ARG API_RECOMENDATIONS_PORT
ENV API_RECOMENDATIONS_PORT=$API_RECOMENDATIONS_PORT

WORKDIR /app
COPY ./front/package*.json ./
RUN npm install
COPY ./front .
RUN npm run build
COPY ./front/assets /app/dist

# estágio de produção
FROM nginx:1.13.12-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY  ./docker/nginx/app.conf /etc/nginx/conf.d/app.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]