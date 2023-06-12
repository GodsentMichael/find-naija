import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.errorCode,
        validationErrors: err.validationErrors,
      },
    });
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
