import { CreateOptions } from 'html-pdf';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';
import { User } from 'src/entities/user';
import { Request } from 'express';
export interface PdfQueryParams {
  template_id: string;
}

export interface PdfBody {
  templateData: Record<string, string | number | any>;
  renderOptions: LiquidOptions;
  pdfOptions: CreateOptions;
}

export interface RequestWithUser extends Request {
  userId: string;
  user?: Partial<User>;
  apiKey?: string;
}
