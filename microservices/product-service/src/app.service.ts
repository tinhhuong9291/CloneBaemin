import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,

    @Inject('SHIPPING_NAME') private shippingService: ClientProxy,
  ) {}

  async getProduct() {
    return await this.prismaService.product.findMany();
  }

  async orders(data) {
    let { product_id, user_id, email, full_name, address } = data;
    let orderData = await this.prismaService.orders.create({
      data: { product_id, user_id },
    });

    if (orderData) {
      // lưu shipping => service shipping
      let shippingData = await lastValueFrom(
        this.shippingService.send('shipping_product', {
          order_id: orderData.order_id,
          email,
          full_name,
          address,
        }),
      );
      console.log(shippingData);
    }

    return orderData;
  }
}
