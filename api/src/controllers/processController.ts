import { Controller, Get, Param } from 'routing-controllers';
import { pdfService } from 'src/services/pdfService';

@Controller('/preview')
export class processController {
  private readonly pdfService = new pdfService();

  @Get('/:id')
  async renderById(@Param('id') id: string) {
    return await this.pdfService.previewTemplate(id);
  }
}
