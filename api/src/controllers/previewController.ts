import { Controller, Get, Param, UseBefore } from 'routing-controllers';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { pdfService } from 'src/services/pdfService';

@Controller('/preview')
@UseBefore(authMiddleware)
export class processController {
  private readonly pdfService = new pdfService();

  @Get('/:id')
  async renderById(@Param('id') id: string) {
    return await this.pdfService.previewTemplate(id);
  }
}
