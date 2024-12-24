import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getProduct(): Promise<any>;
}
