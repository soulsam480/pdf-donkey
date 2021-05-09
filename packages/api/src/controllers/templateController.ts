import {
  Body,
  Controller,
  CurrentUser,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseBefore,
} from 'routing-controllers';
import { TemplateEntity } from 'src/entities/template';
import { User } from 'src/entities/user';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { getRepository } from 'typeorm';

@Controller('/template')
@UseBefore(authMiddleware)
export class userController {
  private readonly templateRepo = getRepository(TemplateEntity);
  @Get('/')
  async getAll() {
    return await this.templateRepo.find();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.templateRepo.findOne({ id: id });
  }

  @Post('/')
  async createTemplate(
    @Body() template: TemplateEntity,
    @CurrentUser() user: User,
  ) {
    return this.templateRepo
      .create({
        ...template,
        user: { id: user.id },
      })
      .save();
  }

  @Put('/:id')
  async updateById(@Param('id') id: string, @Body() template: TemplateEntity) {
    return await this.templateRepo.update({ id: id }, { ...template });
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return await this.templateRepo.delete({ id: id });
  }
}
