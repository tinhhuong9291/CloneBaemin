import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

export function setupHelmet(app: NestExpressApplication) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'https://trusted-scripts.example.com'],
          imgSrc: ["'self'", 'https:', 'data:'],
          connectSrc: ["'self'", 'https://api.example.com'],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://trusted-styles.example.com',
          ],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          upgradeInsecureRequests: [],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      dnsPrefetchControl: { allow: false },
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      noSniff: true,
      hidePoweredBy: true,
    }),
  );
}
