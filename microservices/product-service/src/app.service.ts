import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(

    // @Inject('SHIPPING_NAME') private shippingService: ClientProxy,
    // @Inject('ORDER_NAME') private orderService: ClientProxy,
  ) {}

  // async getProduct() {
  //   return await this.prismaService.product.findMany();
  // }
}
