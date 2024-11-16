import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CustomLoggerService } from '../services/custom-logger.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationGuard } from '../core/guards/auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    DatabaseService,
    CustomLoggerService,
    JwtStrategy,
    AuthenticationGuard,
  ],
})
export class AuthModule {}
