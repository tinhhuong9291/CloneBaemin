import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class AppController {
    private readonly appService;
    private productService;
    private notifyService;
    private orderService;
    private userService;
    constructor(appService: AppService, productService: ClientProxy, notifyService: ClientProxy, orderService: ClientProxy, userService: ClientProxy);
    getHello(): Promise<any>;
    order(order: any): Promise<string>;
}
