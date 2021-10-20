import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      code: 'token.invalid',
    });
  }

  const [, token] = authToken.split(' ');

  if (!JWT_SECRET) {
    console.error('[ERROR]: JWT SECRET is missing');
    return response.status(500).json({
      code: 'INTERNAL ERROR',
    });
  }

  try {
    const { sub } = verify(token, JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err: any) {
    return response.status(401).json({
      code: 'token.expired'
    });
  }
}