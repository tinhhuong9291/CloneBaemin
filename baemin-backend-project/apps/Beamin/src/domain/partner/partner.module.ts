import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CustomLoggerService } from '../../services/custom-logger.service';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [PartnerController],
  providers: [
    PartnerService,
    DatabaseService,
    CustomLoggerService,
    JwtStrategy,
    AuthenticationGuard,
  ],
})
export class PartnerModule {}