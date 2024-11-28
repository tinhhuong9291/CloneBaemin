FROM node:20

WORKDIR /root/user-service

COPY package.json .

RUN yarn install

COPY ./src/prisma ./src/prisma 

RUN yarn prisma generate --schema src/prisma/schema.prisma 

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]

# docker build . -t user-service
# docker run -d --name user-service --net node-network -e REDIS_HOST=some-redis -e EDIS_PORT=6379 -e ... user-service