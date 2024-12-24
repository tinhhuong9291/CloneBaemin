import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { mongooseConfig } from './config/mongoose.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './models/food.model';
@Module({
  imports: [
    ,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConfig,
    }),
    ClientsModule.register([
      {
        name: 'PRODUCT_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'product_queue',
          queueOptions: {
            durable: true,
          },
          persistent: true,
        },
      },
    ]),
    RedisCacheModule,
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    // ElasticsearchModule.register({
    //   node: process.env.ELASTICSEARCH_NODE,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
