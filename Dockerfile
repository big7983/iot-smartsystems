FROM node:22.11.0-alpine

WORKDIR /

RUN yarn install

COPY package.json package-lock.json ./
COPY .next ./

EXPOSE 4200
CMD ["yarn", "start"]