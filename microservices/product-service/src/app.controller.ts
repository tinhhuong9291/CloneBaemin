import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // @MessagePattern('get_demo_cache')
  // async getCache(@Payload() data) {
  //   console.log(await this.cacheManager.get('DEMO'));
  //   return await this.cacheManager.get('DEMO');
  // }

  // @MessagePattern('get_product')
  // getProduct(@Payload() data) {
  //   console.log(data);

  //   return this.appService.getProduct();
  // }
}

// yarn add prisma @prisma/client
// yarn prisma init
// update .env
// yarn prisma db pull
// yarn prisma generate

// yarn add @nestjs/config
