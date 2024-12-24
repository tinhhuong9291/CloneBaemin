import { PrismaService } from './prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private prismaService;
    private notifyService;
    constructor(prismaService: PrismaService, notifyService: ClientProxy);
    shipping(data: any): Promise<any>;
}
