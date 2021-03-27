import { Controller, Get } from 'routing-controllers';
import { User } from 'src/entities/user';
import { getRepository } from 'typeorm';

@Controller('/users')
export class userController {
  private readonly userRepo = getRepository(User);
  @Get('/')
  getAll() {
    return this.userRepo.find();
  }
}
