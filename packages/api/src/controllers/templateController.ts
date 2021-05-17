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
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Controller('/template')
@UseBefore(authMiddleware)
export class userController {
  private readonly templateRepo = getRepository(TemplateEntity);
  @Get('/')
  async getAll(@CurrentUser() user: User) {
    return await this.templateRepo.find({
      where: {
        user: user.id,
      },
    });
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.templateRepo.findOne({
      where: { id: id, user: user.id },
    });
  }

  @Post('/')
  async createTemplate(
    @Body() template: TemplateEntity,
    @CurrentUser() user: User,
  ) {
    console.log(template);

    return this.templateRepo
      .create({
        ...template,
        user: { id: user.id },
      })
      .save();
  }

  @Put('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() template: QueryDeepPartialEntity<TemplateEntity>,
    @CurrentUser() user: User,
  ) {
    return await this.templateRepo.update(
      { id: id, user: user },
      { ...template },
    );
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.templateRepo.delete({ id: id, user: user });
  }
  @Get('/user/:id')
  async getByUser(@Param('id') id: string) {
    return await this.templateRepo.find({ where: { user: id } });
  }
}
