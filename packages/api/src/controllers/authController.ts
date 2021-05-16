import { User } from './../entities/user';
import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers';
import { getRepository } from 'typeorm';
import { authService } from 'src/services/authService';
import { Response } from 'express';
import passport from 'passport';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
import { sign } from 'jsonwebtoken';

@Controller('/auth')
export class userController {
  private readonly userRepo = getRepository(User);
  private readonly authService = new authService();
  @Post('/register')
  registerUser(@Body() user: User, @Res() response: Response) {
    return this.authService.register(user, response);
  }

  @Post('/login')
  loginUser(
    @Body() loginDto: { password: string; email: string },
    @Res() response: Response,
  ) {
    return this.authService.login(loginDto.password, loginDto.email, response);
  }
  @Get('/google')
  @UseBefore(passport.authenticate('google', { scope: ['profile', 'email'] }))
  googleOauth() {}

  @Get('/google/redirect')
  @UseBefore(passport.authenticate('google'))
  @Redirect('http://localhost:4001/?auth_success=')
  googleOauthRedirect(@Req() request: RequestWithUser) {
    const uid = request?.user?.id;
    const token = sign(
      { userId: uid },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '15min',
      },
    );
    return !process.env.PROD
      ? `http://localhost:4001/?auth_success=${token}`
      : `https://donkey.sambitsahoo.com/?auth_success=${token}`;
  }
}
