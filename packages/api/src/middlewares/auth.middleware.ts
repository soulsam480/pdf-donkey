import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { User } from 'src/entities/user';

export interface RequestWithUser extends Request {
  userId?: string;
  user?: Partial<User>;
}

export class authMiddleware implements ExpressMiddlewareInterface {
  use(request: RequestWithUser, response: Response, next: NextFunction): any {
    const accessToken = request.headers['access-token'] as string;
    if (typeof accessToken !== 'string') return response.sendStatus(401);
    try {
      const data = <{ userId: string }>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
      );
      request.userId = data.userId;
      return next();
    } catch {
      return response.sendStatus(401);
    }
  }
}
