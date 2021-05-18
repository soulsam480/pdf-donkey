import { getRepository } from 'typeorm';
import { Controller, Get, Req, HttpError } from 'routing-controllers';
import { authService } from 'src/services/authService';
import { User } from 'src/entities/user';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

@Controller('/token')
export class tokenController {
  private readonly authService = new authService();
  private readonly userRepo = getRepository(User);
  @Get('/refresh')
  async sendAccessToken(@Req() request: Request) {
    const refreshToken = request.headers['refresh-token'] as string;
    if (typeof refreshToken !== 'string')
      throw new HttpError(401, 'refresh token not found !');
    const token = refreshToken.split('Bearer ')[1];
    if (!token) throw new HttpError(401, 'refresh token not found !');
    let data;
    try {
      data = <{ userId: string }>(
        verify(token, process.env.REFRESH_TOKEN_SECRET as string)
      );
    } catch {
      throw new HttpError(401, 'Token is expired or invalid !');
    }
    const user = await this.userRepo.findOne({ id: data.userId });
    return this.authService.createTokens(user as User);
  }
}
