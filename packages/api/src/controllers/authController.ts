import { User } from './../entities/user';
import { Body, Controller, Post } from 'routing-controllers';
import { getRepository } from 'typeorm';
import { authService } from 'src/services/authService';

@Controller('/auth')
export class userController {
  private readonly userRepo = getRepository(User);
  private readonly authService = new authService();
  @Post('/register')
  registerUser(@Body() user: User) {
    return this.authService.register(user);
  }

  @Post('/login')
  loginUser(@Body() loginDto: { password: string; email: string }) {
    return this.authService.login(loginDto.password, loginDto.email);
  }
}
