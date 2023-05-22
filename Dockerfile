FROM node:lts-alpine as build-stage

WORKDIR /app
COPY ./package*.json ./
RUN yarn 
COPY . .
RUN yarn build

FROM ngix:stage-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/ngix/html
EXPOSE 80
COPY default.conf /etc/ngix/conf.d/
CMD ["ngix","g","deamon off;"]