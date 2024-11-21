import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
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

    // gửi mail thành công
    let infoMail = {
      from: 'thanhtien3100@gmail.com',
      to: data, // "khaitruong2112@gmail.com"
      subject: 'Đặt hàng qua Amazon',
      html: "<h1 style='color:red' > Đặt hàng thành công </h1>",
    };

    configMail.sendMail(infoMail, (error) => error);
  }
}
