import { User } from './../entities/user';
import { Body, Controller, Post, Res } from 'routing-controllers';
import { getRepository } from 'typeorm';
import { authService } from 'src/services/authService';
import { Response } from 'express';

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
}
