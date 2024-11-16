import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CustomLoggerService } from '../../services/custom-logger.service';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [PromotionController],
  providers: [
    PromotionService,
    DatabaseService,
    CustomLoggerService,
    JwtStrategy,
    AuthenticationGuard,
  ],
})
export class PromotionModule {}
