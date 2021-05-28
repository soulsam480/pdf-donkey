import { Response } from 'express';
import {
  BadRequestError,
  Body,
  Controller,
  Get,
  InternalServerError,
  Patch,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers';
import { User } from 'src/entities/user';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { authService } from 'src/services/authService';
import { RequestWithUser } from 'src/types/types';
import { ERROR_MESSAGES } from 'src/utils/constants';
import { getRepository } from 'typeorm';

@UseBefore(authMiddleware)
@Controller('/user')
export class userController {
  private readonly userRepo = getRepository(User);
  private readonly authService = new authService();

  @Get('/')
  async getUserFromToken(@Req() { userId }: RequestWithUser, @Res() response: Response) {
    const user = await this.userRepo.findOne({ id: userId });
    if (!user) return response.status(400).send(ERROR_MESSAGES.user_not_found);

    (user.password as any) = undefined;
    (user.api_key as any) = undefined;
    return {
      ...user,
      ...this.authService.createTokens(user),
    };
  }

  @Patch('/')
  async updateUser(@Req() { userId }: RequestWithUser, @Body() user: Partial<User>) {
    try {
      const userFromDb = await this.userRepo.findOne({ where: { id: userId } });
      if (!userFromDb) throw new BadRequestError(ERROR_MESSAGES.user_not_found);
      return await this.userRepo.update({ id: userId }, { ...user });
    } catch (error) {
      throw new BadRequestError(ERROR_MESSAGES.user_exists_with_credentials);
    }
  }

  @Get('/key')
  async getApiKey(@Req() { userId }: RequestWithUser) {
    try {
      const userFromDb = await this.userRepo.findOne({ where: { id: userId } });
      if (!userFromDb) throw new BadRequestError(ERROR_MESSAGES.user_not_found);
      const { api_key } = userFromDb;
      if (api_key) return api_key;
      return await this.authService.generateApiKey(userId);
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }
}
