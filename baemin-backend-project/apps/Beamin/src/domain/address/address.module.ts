import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseService } from '../../database/database.service';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomLoggerService } from '../../services/custom-logger.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
    DatabaseService,
    CustomLoggerService,
    JwtStrategy,
    AuthenticationGuard,
  ],
})
export class AddressModule {}
