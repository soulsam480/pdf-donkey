import { Liquid } from 'liquidjs';
import { HttpError } from 'routing-controllers';
import { TemplateEntity } from 'src/entities/template';
import { getRepository } from 'typeorm';

export class pdfService {
  private readonly templateRepo = getRepository(TemplateEntity);
  private readonly engine = new Liquid();

  async previewTemplate(id: string) {
    const template = await this.templateRepo.findOne(id);
    if (!template) return new HttpError(400, 'Template not found !');
    return await this.engine.parseAndRender(template?.markup as string, JSON.parse(template?.data));
  }
}
