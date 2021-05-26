import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerError,
  Param,
  Post,
  Put,
  Req,
  UseBefore,
} from 'routing-controllers';
import { TemplateEntity } from 'src/entities/template';
import { authMiddleware, RequestWithUser } from 'src/middlewares/auth.middleware';
import { ERROR_MESSAGES } from 'src/utils/constants';
import { getRepository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Controller('/template')
@UseBefore(authMiddleware)
export class userController {
  private readonly templateRepo = getRepository(TemplateEntity);
  @Get('/')
  async getAll(@Req() { userId }: RequestWithUser) {
    try {
      return await this.templateRepo
        .find({
          where: {
            user: userId,
          },
        })
        .then((res) =>
          res.sort((a, b) => (b.updatedAt as Date).getTime() - (a.updatedAt as Date).getTime()),
        );
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Req() { userId }: RequestWithUser) {
    try {
      const template = await this.templateRepo.findOne({
        where: { id: id, user: userId },
      });
      return {
        ...template,
        data: template?.data ? JSON.parse(template?.data) : {},
        meta: template?.data ? JSON.parse(template?.meta) : {},
      };
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }

  @Post('/')
  async createTemplate(@Body() template: TemplateEntity, @Req() { userId }: RequestWithUser) {
    try {
      return this.templateRepo
        .create({
          ...template,
          data: template.data ? JSON.stringify(template.data) : '{}',
          meta: template.data ? JSON.stringify(template.meta) : '{}',
          user: { id: userId },
        })
        .save();
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }

  @Put('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() template: QueryDeepPartialEntity<TemplateEntity>,
    @Req() { userId }: RequestWithUser,
  ) {
    try {
      return await this.templateRepo.update(
        { id: id, user: { id: userId } },
        { ...template, data: JSON.stringify(template.data), meta: JSON.stringify(template.meta) },
      );
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string, @Req() { userId }: RequestWithUser) {
    try {
      return await this.templateRepo.delete({ id: id, user: { id: userId } });
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }
  @Get('/user/:id')
  async getByUser(@Param('id') id: string) {
    try {
      return await this.templateRepo.find({ where: { user: id } });
    } catch (error) {
      throw new InternalServerError(ERROR_MESSAGES.iss);
    }
  }
}
