import compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';

export function setupCompression(app: NestExpressApplication) {
  app.use(
    compression({
      level: 6,
      threshold: '1kb',
    }),
  );
}
