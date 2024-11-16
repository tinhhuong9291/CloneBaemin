import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import moment from 'moment';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomLoggerService } from '../services/custom-logger.service';
import { MESSAGES } from '../utils/constants/message';
import {
  ErrorResponseObj,
  ValidationErrorResponse,
} from '../@types/error.type';

@Catch()
export class CustomHttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new CustomLoggerService();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server error';
    let errors: ValidationErrorResponse[] | undefined;
    let hasValidationError = false;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Handle validation errors (BadRequestException)
      if (exception instanceof BadRequestException) {
        hasValidationError = true;
        status = HttpStatus.BAD_REQUEST;
        message = MESSAGES.VALIDATION_MESSAGES.TITLE;
        errors = this.formatValidationErrors(exceptionResponse);
      }

      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        const potentialMessage = exceptionResponse['message'];

        if (typeof potentialMessage === 'string') {
          message = potentialMessage;
        }
      }

      if (status === HttpStatus.TOO_MANY_REQUESTS) {
        message = MESSAGES.ERROR_RESPONSE.TOO_MANY_RES;
      }
    }

    const errorResponse: ErrorResponseObj = {
      statusCode: hasValidationError ? HttpStatus.BAD_REQUEST : status,
      message,
      errors,
      data: null,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
      messageConstants: '',
    };

    response.status(status).json(errorResponse);

    this.logger.error(
      JSON.stringify(errorResponse),
      CustomHttpExceptionFilter.name,
    );

    super.catch(exception, host);
  }

  // Method to format validation errors
  private formatValidationErrors(response: any): ValidationErrorResponse[] {
    if (response?.message && Array.isArray(response.message)) {
      return response.message.map((msg: string) => {
        const [field, ...constraints] = msg.split(' ');
        return {
          field,
          constraints: msg,
        };
      });
    }

    return [
      {
        field: 'unknown',
        constraints: 'Validation error occurred.',
      },
    ];
  }
}
