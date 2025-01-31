FROM node:22.11.0-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock* ./

RUN yarn install

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

CMD ["yarn", "start"]