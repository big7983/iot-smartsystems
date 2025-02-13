FROM node:22.11.0-alpine

WORKDIR /app

RUN npm i -g pm2

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 4200
CMD ["pm2-runtime", "start", "--name", "nextjs-app"]
