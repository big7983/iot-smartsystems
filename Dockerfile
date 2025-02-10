FROM node:22.11.0-alpine

WORKDIR /app

RUN npm i -g pm2

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 4200
#CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
CMD [ "pm2-runtime", "ecosystem.config.js"]