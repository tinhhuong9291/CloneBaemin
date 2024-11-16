import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CustomLoggerService } from '../../services/custom-logger.service';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryModule } from '../../config/cloudinary/cloudinary.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule.forRoot(),
    CloudinaryModule,
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    DatabaseService,
    CustomLoggerService,
    JwtStrategy,
    AuthenticationGuard,
  ],
})
export class UploadModule {}
