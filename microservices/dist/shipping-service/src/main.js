"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://admin:1234@localhost:5672'],
            queue: "shipping_queue",
            queueOptions: {
                durable: true
            },
            persistent: true
        }
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map