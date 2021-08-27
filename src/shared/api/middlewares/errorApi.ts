import { NextFunction, Request, Response } from 'express';
import HandleError from '@shared/errors/HandleError';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HandleError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log('ERROR: ', err.message);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
