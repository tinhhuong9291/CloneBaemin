import * as Joi from 'joi';
import { Logger } from '@nestjs/common';
const logger = new Logger('ConfigValidation');

export const configValidationSchema = Joi.object({
  PORT: Joi.number()
    .default(3000)
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid PORT value: ${err.message}`);
      });
      return errors;
    }),

  DATABASE_URL: Joi.string()
    .uri()
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid DATABASE_URL value: ${err.message}`);
      });
      return errors;
    }),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development')
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid NODE_ENV value: ${err.message}`);
      });
      return errors;
    }),

  SWAGGER_USERNAME: Joi.string()
    .min(4)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid SWAGGER_USERNAME value: ${err.message}`);
      });
      return errors;
    }),

  SWAGGER_PASSWORD: Joi.string()
    .min(4)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid SWAGGER_PASSWORD value: ${err.message}`);
      });
      return errors;
    }),

  JWT_ACCESS_TOKEN_SECRET: Joi.string()
    .min(32)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid JWT_SECRET value: ${err.message}`);
      });
      return errors;
    }),

  JWT_REFRESH_TOKEN_SECRET: Joi.string()
    .min(32)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid JWT_REFRESH_TOKEN value: ${err.message}`);
      });
      return errors;
    }),

  JWT_ALGORITHM: Joi.string()
    .min(5)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid JWT_ALGORITHM value: ${err.message}`);
      });
      return errors;
    }),

  ACCESS_TOKEN_EXPIRESIN: Joi.string()
    .min(2)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid ACCESS_TOKEN_EXPIRESIN value: ${err.message}`);
      });
      return errors;
    }),

  REFRESH_TOKEN_EXPIRESIN: Joi.string()
    .min(2)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid REFRESH_TOKEN_EXPIRESIN value: ${err.message}`);
      });
      return errors;
    }),

  FORGOT_PASSWORD_TOKEN_EXPIRESIN: Joi.string()
    .min(2)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(
          `Invalid FORGOT_PASSWORD_TOKEN_EXPIRESIN value: ${err.message}`,
        );
      });
      return errors;
    }),

  COOKIES_EXPIRESIN: Joi.number()
    .integer()
    .positive()
    .default(604800000)
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid COOKIES_EXPIRESIN value: ${err.message}`);
      });
      return errors;
    }),

  SECRET_COOKIE_NAME: Joi.string()
    .min(7)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid SECRET_COOKIE_NAME value: ${err.message}`);
      });
      return errors;
    }),

  TIMEOUT: Joi.number()
    .integer()
    .positive()
    .default(5000)
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid TIMEOUT value: ${err.message}`);
      });
      return errors;
    }),

  HASH_SALT_ROUNDS: Joi.number()
    .integer()
    .positive()
    .default(10)
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid HASH_SALT_ROUNDS value: ${err.message}`);
      });
      return errors;
    }),

  CLOUDINARY_CLOUD_NAME: Joi.string()
    .min(7)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid CLOUDINARY_CLOUD_NAME value: ${err.message}`);
      });
      return errors;
    }),

  CLOUDINARY_API_SECRET: Joi.string()
    .min(7)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid CLOUDINARY_API_SECRET value: ${err.message}`);
      });
      return errors;
    }),

  CLOUDINARY_API_KEY: Joi.string()
    .min(7)
    .required()
    .error(errors => {
      errors.forEach(err => {
        logger.error(`Invalid CLOUDINARY_API_KEY value: ${err.message}`);
      });
      return errors;
    }),
});
