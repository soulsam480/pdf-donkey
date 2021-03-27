import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { TemplateEntity } from 'src/entities/template';
import { getRepository } from 'typeorm';

@Controller('/template')
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
  async createTemplate(@Body() template: TemplateEntity) {
    return this.templateRepo.create(template).save();
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
