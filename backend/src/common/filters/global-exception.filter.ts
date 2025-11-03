import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message = 
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message || exception.message;
      error = exception.name;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'A category with this name already exists for this user';
        error = 'Conflict';
      } else {
        console.error('Prisma Error:', exception);
        message = 'Database operation failed';
        error = 'Database Error';
      }
    } else {
      console.error('Unhandled Exception:', exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}
