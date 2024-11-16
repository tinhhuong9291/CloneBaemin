import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupCors } from './core/middlewares/cors.middleware';
import { setupCompression } from './core/middlewares/compression.middleware';
import { setupHelmet } from './core/middlewares/helmet.middleware';
import { DatabaseService } from './database/database.service';
import { CustomHttpExceptionFilter } from './config/error.config';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  const configService = app.get(ConfigService);

  app.disable('x-powered-by');

  setupHelmet(app);

  setupCors(app, configService);

  setupCompression(app);

  app.get(DatabaseService);

  app.setGlobalPrefix('api/v1/');

  app.useGlobalFilters(new CustomHttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      transformOptions: { enableCircularCheck: true },
    }),
  );

  app.enableShutdownHooks();

  // Additional shutdown signal handling (optional)
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down successfully');
    app.close().then(() => {
      console.log('NestJS app closed');
    });
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down successfully');
    app.close().then(() => {
      console.log('NestJS app closed');
    });
  });

  setupSwagger(app);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  Logger.log(`🚀 Server is running on: ${await app.getUrl()}`);
}

void (async (): Promise<void> => {
  try {
    await bootstrap();
  } catch (error) {
    Logger.error(error, '❌ Error starting server');
  }
})();
