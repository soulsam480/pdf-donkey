import { NextFunction, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { RequestWithUser } from 'src/types/types';

export class ApiKeyMiddleware implements ExpressMiddlewareInterface {
  async use(request: RequestWithUser, response: Response, next: NextFunction) {
    const apiKey = request.headers['api-key'] as string;
    if (typeof apiKey !== 'string') return response.status(404).send('API key not found !');
    request.apiKey = apiKey;
    return next();
  }
}
