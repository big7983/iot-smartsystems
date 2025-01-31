FROM node:22.11.0-alpine

WORKDIR /

RUN npm i
RUN npm run build

EXPOSE 4200
CMD ["npm", "start"]