import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Beamin API')
  .setDescription(
    'An advanced NestJS backend for a modern food delivery service, powered by PostgreSQL and Prisma. Learn to build scalable backends with cutting-edge Node.js technologies in this project from the Advanced Node.js Course.',
  )
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'authorization',
  )
  .addApiKey(
    {
      type: 'apiKey',
      in: 'header',
      name: 'X-Api-Key',
      description: 'Enter your API key to access this endpoint',
    },
    'X-Api-Key',
  )
  .build();
