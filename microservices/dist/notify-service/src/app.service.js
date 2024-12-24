"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let AppService = class AppService {
    sendMailConfirm(data) {
        let configMail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'thanhtien3100@gmail.com',
                pass: 'gsakvdafmyxfdpmo',
            },
        });
        let infoMail = {
            from: 'thanhtien3100@gmail.com',
            to: data,
            subject: 'Đặt hàng qua Amazon',
            html: '<h1> Xác nhận đơn hàng thành công </h1>',
        };
        configMail.sendMail(infoMail, (error) => error);
    }
    sendMailSuccess(data) {
        let configMail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'thanhtien3100@gmail.com',
                pass: 'gsakvdafmyxfdpmo',
            },
        });
        let infoMail = {
            from: 'thanhtien3100@gmail.com',
            to: data,
            subject: 'Đặt hàng qua Amazon',
            html: "<h1 style='color:red' > Đặt hàng thành công </h1>",
        };
        configMail.sendMail(infoMail, (error) => error);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map