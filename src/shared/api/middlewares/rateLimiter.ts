import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import ApiError from '@shared/errors/HandleError';

const limiter = new RateLimiterMemory({
  keyPrefix: 'ratelimit',
  points: 120,
  duration: 1,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    throw new ApiError('Too many requests.', 429);
  }
}
