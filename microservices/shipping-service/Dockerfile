FROM node:20

WORKDIR /root/shipping-service

COPY package.json .

RUN yarn install

COPY ./src/prisma ./src/prisma 

RUN yarn prisma generate --schema src/prisma/schema.prisma 

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]

# docker build . -t shipping-service
# docker run -d --name shipping-service -e DATABASE_URL=mysql://root:1234@some-mysql:3306/db_amazon --net node-network shipping-service