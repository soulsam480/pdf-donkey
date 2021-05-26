import { getRepository } from 'typeorm';
import { Controller, Get, Req, UnauthorizedError } from 'routing-controllers';
import { authService } from 'src/services/authService';
import { User } from 'src/entities/user';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { ERROR_MESSAGES } from 'src/utils/constants';

@Controller('/token')
export class tokenController {
  private readonly authService = new authService();
  private readonly userRepo = getRepository(User);
  @Get('/refresh')
  async sendAccessToken(@Req() request: Request) {
    const refreshToken = request.headers['refresh-token'] as string;
    if (typeof refreshToken !== 'string')
      throw new UnauthorizedError(ERROR_MESSAGES.refresh_token_not_found);
    const token = refreshToken.split('Bearer ')[1];
    if (!token) throw new UnauthorizedError(ERROR_MESSAGES.refresh_token_not_found);
    let data;
    try {
      data = <{ userId: string }>verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    } catch {
      throw new UnauthorizedError(ERROR_MESSAGES.acccess_token_expired);
    }
    const user = await this.userRepo.findOne({ id: data.userId });
    return this.authService.createTokens(user as User);
  }
}
