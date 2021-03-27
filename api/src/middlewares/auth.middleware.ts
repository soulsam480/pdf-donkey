import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressMiddlewareInterface } from 'routing-controllers';

export interface RequestWithUser extends Request {
  userId?: string;
}

export class authMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  use(request: RequestWithUser, response: Response, next: NextFunction): any {
    const accessToken = request.headers['access-token'] as string;
    if (typeof accessToken !== 'string') return response.sendStatus(401);

    try {
      const data = <{ userId: string }>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
      );
      request.userId = data.userId;
      return next();
    } catch {}

    const refreshToken = request.headers['refresh-token'] as string;
    if (typeof refreshToken !== 'string') return response.sendStatus(401);

    let data;
    try {
      data = <{ userId: string }>(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
      );
    } catch {
      return response.sendStatus(401);
    }
    request.userId = data.userId;
    next();
  }
}
