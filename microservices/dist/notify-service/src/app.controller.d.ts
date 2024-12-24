import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sendMailConfirm(data: any): void;
    sendMailSuccess(data: any): void;
}
