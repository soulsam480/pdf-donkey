import { User } from './../entities/user';
import { Controller, Get } from 'routing-controllers';
import { getRepository } from 'typeorm';

@Controller('/users')
export class userController {
  private readonly userRepo = getRepository(User);
  @Get('/')
  getAll() {
    return this.userRepo.find();
  }
}
