FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./package* ./

RUN npm set progress=false && npm config set depth 0
RUN npm i --saveDev

COPY . ./

WORKDIR /usr/src/app
CMD ["npm","run","start:dev"]
