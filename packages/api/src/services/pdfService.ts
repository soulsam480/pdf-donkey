import { Liquid } from 'liquidjs';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';
import { TemplateEntity } from 'src/entities/template';
import { create, CreateOptions } from 'html-pdf';
import { ReadStream } from 'fs';
export class pdfService {
  private readonly engine = new Liquid();

  async generatePdf(
    template: TemplateEntity,
    data: Record<string, string | number | any>,
    renderOpts?: LiquidOptions,
    pdfOpts?: CreateOptions,
  ): Promise<ReadStream> {
    return new Promise(async (resolve, reject) => {
      try {
        const { markup } = template;
        const renderedTemplate = await this.engine.parseAndRender(markup, { ...data }, renderOpts);
        create(renderedTemplate, pdfOpts).toStream((err, stream) => {
          if (err) return reject(err);
          resolve(stream);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
