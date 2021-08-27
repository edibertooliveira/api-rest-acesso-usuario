import { NextFunction, Request, Response } from 'express';
import HandleError from '@shared/errors/HandleError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

type IRestrictionLevel = (role: string) => void;

const restrictionConfig = new Map([
  [1, 'customer'],
  [2, 'admin'],
]);

export const restrictionLevel =
  (key: number) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (role: string) => {
    if (key && !role.includes(<string>restrictionConfig.get(key))) {
      throw new HandleError('Run access prohibited.', 403);
    }
  };

export default function isAuthenticated(restrictionLevel: IRestrictionLevel) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new HandleError('JWT Token is missing.', 401);
    const [, token] = authHeader.split(' ');
    try {
      const { sub, role } = verify(
        token,
        authConfig.jwt.secret,
      ) as ITokenPayload;
      restrictionLevel(role);
      req.user = { id: sub };

      next();
    } catch (error) {
      throw new HandleError('Invalid JWT Token', 401);
    }
  };
}
