import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export function handlingErrors(
  err: Error,
  _: Request,
  response: Response,
  __: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error: ${err.message}`,
  });
}
