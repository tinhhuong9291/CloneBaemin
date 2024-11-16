import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

export function setupCors(
  app: NestExpressApplication,
  configService: ConfigService,
) {
  const allowedOrigins = configService.get<string[]>('ALLOWED_ORIGINS', [
    'http://localhost:5500',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000',
  ]);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
}
