import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import moment from 'moment';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error('Database error:', exception.message);

    response.status(status).json({
      statusCode: status,
      message: 'An unexpected error occurred with the database',
      error: exception.message,
      path: request.url,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
      messageConstants: null,
    });
  }
}
