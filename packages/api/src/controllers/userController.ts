import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { Controller, Get, HttpError, Req } from 'routing-controllers';
import { User } from 'src/entities/user';
import { authService } from 'src/services/authService';
import { getRepository } from 'typeorm';

@Controller('/user')
export class userController {
  private readonly userRepo = getRepository(User);
  private readonly authService = new authService();
  @Get('/')
  async getUserFromToken(@Req() request: Request) {
    const accessToken = request.headers['access-token'] as string;
    if (typeof accessToken !== 'string')
      return new HttpError(401, 'access token not found !');
    let data: any;
    try {
      data = <{ userId: string }>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
      );
    } catch {
      return new HttpError(401, 'Token is expired or invalid !');
    }
    const user = await this.userRepo.findOne({ id: data.userId });
    if (!user) throw new HttpError(400, "user doesn't exist !");

    (user.password as any) = undefined;
    return {
      ...user,
      ...this.authService.createTokens(user),
    };
  }
}
