FROM node:20

WORKDIR /root/user-service

COPY package.json .

RUN yarn install

COPY ./src/prisma ./src/prisma 

RUN yarn prisma generate --schema src/prisma/schema.prisma 

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]

# docker build . -t notify-service
# docker run -d --name notify-service --net node-network -e REDIS_HOST=some-redis -e EDIS_PORT=6379 -e ... notify-service