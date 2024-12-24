"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(appService, productService, notifyService, orderService, userService) {
        this.appService = appService;
        this.productService = productService;
        this.notifyService = notifyService;
        this.orderService = orderService;
        this.userService = userService;
    }
    async getHello() {
        let dataProduct = await (0, rxjs_1.lastValueFrom)(this.productService.send('get_product', 'hello'));
        return dataProduct;
    }
    async order(order) {
        let { email, product_id, user_id, full_name, phone, address } = order;
        await this.notifyService.emit('confirm_order', email);
        let order_data = await (0, rxjs_1.lastValueFrom)(this.productService.send('order_key', order).pipe((0, rxjs_1.timeout)(1000), (0, rxjs_1.retry)(3), (0, rxjs_1.catchError)((err) => {
            console.log('Service product not active');
            return (0, rxjs_1.of)('Service product not active');
        })));
        return 'Đặt hàng thành công';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/get-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('/order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "order", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('PRODUCT_NAME')),
    __param(2, (0, common_1.Inject)('NOTIFY_NAME')),
    __param(3, (0, common_1.Inject)('ORDER_NAME')),
    __param(4, (0, common_1.Inject)('USER_NAME')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppController);
//# sourceMappingURL=app.controller.js.map