import { User } from './../entities/user';
import { Controller, Get } from 'routing-controllers';
import { getRepository } from 'typeorm';

@Controller('/auth')
export class userController {
  private readonly userRepo = getRepository(User);
}
