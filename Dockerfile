FROM node:22.11.0-alpine

WORKDIR /

COPY package.json package-lock.json ./
COPY .next ./

RUN yarn install

COPY ./ .

EXPOSE 4200
CMD ["yarn", "start"]