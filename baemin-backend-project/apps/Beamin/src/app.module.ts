import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './utils/validations/validation.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './config/configuration';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttleConfig } from './config/throttle.config';
import { CustomLoggerService } from './services/custom-logger.service';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './core/filters/prisma-exception.filter';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './domain/banners/banner.module';
import { OrderModule } from './domain/orders/orders.module';
import { ProductModule } from './domain/products/products.module';
import { MenuModule } from './domain/menu/menu.module';
import { CartModule } from './domain/cart/cart.module';
import { StoreModule } from './domain/stores/stores.module';
import { UserModule } from './domain/users/user.module';
import { VoucherModule } from './domain/vouchers/voucher.module';
import { WishlistModule } from './domain/wishlists/wishlist.module';
import { ReviewModule } from './domain/reviews/review.module';
import { PromotionModule } from './domain/promotions/promotion.module';
import { UploadModule } from './domain/upload/upload.module';
import { PartnerModule } from './domain/partner/partner.module';
import { AddressModule } from './domain/address/address.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: '.',
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => throttleConfig,
    }),
    DatabaseModule,
    AuthModule,
    BannerModule,
    OrderModule,
    ProductModule,
    MenuModule,
    CartModule,
    StoreModule,
    UserModule,
    VoucherModule,
    WishlistModule,
    ReviewModule,
    PromotionModule,
    UploadModule,
    PartnerModule,
    AddressModule,
  ],
  controllers: [],
  providers: [
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
