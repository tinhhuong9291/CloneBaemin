import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy,
    @Inject("NOTIFY_NAME") private notifyService: ClientProxy,
  ) { }

  @Get("/get-product")
  async getHello() {

    let dataProduct = await lastValueFrom(this.productService.send("get_product", "hello"))
    return dataProduct;
  }

  @Post("/order")
  async order(@Body() order) {
    let { email, product_id, user_id, full_name, phone, address } = order;

    // gửi mail xác nhận đơn hàng    
    await this.notifyService.emit("confirm_order", email)


    // lưu order
    let order_data = await lastValueFrom(this.productService.send("order_key", order).pipe(
      timeout(1000),
      retry(3),
      catchError(err => {
        console.log("Service product not active")
        return of("Service product not active")
      })
    ));



    return "Đặt hàng thành công"

  }
}
