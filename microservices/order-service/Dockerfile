FROM node:20

WORKDIR /root/order-service

COPY package.json .

RUN yarn install

COPY ./prisma ./prisma 

RUN yarn prisma generate --schema ./prisma/schema.prisma 

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]

# docker build . -t order-service
# docker run -d --name notify-service --net node-network -e REDIS_HOST=some-redis -e EDIS_PORT=6379 -e ... notify-service