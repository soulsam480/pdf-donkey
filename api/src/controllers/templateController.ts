import { TemplateEntity } from '../entities/template';
import { Controller, Get } from 'routing-controllers';
import { getRepository } from 'typeorm';

@Controller('/pdf')
export class userController {
  private readonly templateRepo = getRepository(TemplateEntity);
}
