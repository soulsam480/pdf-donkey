import { Response } from 'express';
import {
  Body,
  Controller,
  Method,
  Param,
  Post,
  QueryParams,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers';
import { TemplateEntity } from 'src/entities/template';
import { User } from 'src/entities/user';
import { ApiKeyMiddleware } from 'src/middlewares/apiKey.middleware';
import { pdfService } from 'src/services/pdfService';
import { PdfBody, PdfQueryParams, RequestWithUser } from 'src/types/types';
import { ERROR_MESSAGES } from 'src/utils/constants';
import { getRepository } from 'typeorm';
import cors from 'cors';
import { authMiddleware } from 'src/middlewares/auth.middleware';
@Controller('/pdf')
export class pdfController {
  private readonly userRepo = getRepository(User);
  private readonly templateRepo = getRepository(TemplateEntity);
  private readonly pdfService = new pdfService();

  @UseBefore(cors({ origin: '*' }))
  @Method('options', '/generate')
  optons() {}

  @UseBefore(ApiKeyMiddleware)
  @UseBefore(cors({ origin: '*' }))
  @Post('/generate')
  async getPdf(
    @Req() { apiKey }: RequestWithUser,
    @Body() { pdfOptions, renderOptions, templateData }: PdfBody,
    @QueryParams() { template_id }: PdfQueryParams,
    @Res() response: Response,
  ) {
    try {
      if (!templateData) return response.status(404).send('Template data not found !');
      const userFromKey = await this.userRepo.findOne({ where: { api_key: apiKey } });
      if (!userFromKey) return response.status(401).send('Invalid API key !');
      const templateFromDb = await this.templateRepo.findOne({ where: { id: template_id } });
      if (!templateFromDb)
        return response.status(404).send('No template with the given ID was found !');
      const data = await this.pdfService.generatePdf(
        templateFromDb,
        templateData,
        renderOptions,
        pdfOptions,
      );
      if (!data) return response.status(500).send(ERROR_MESSAGES.iss);
      response.setHeader('Content-Type', 'application/pdf');
      return data;
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: ERROR_MESSAGES.iss, error: error });
    }
  }
}
