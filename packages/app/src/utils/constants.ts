export interface Template {
  id?: string;
  title?: string;
  markup?: string;
  style?: string;
  data?: Record<string, string | number>;
  meta?: Record<string, string | number>;
  user?: string;
  createdAt?: string;
  api_key?: string;
  updatedAt?: string;
}
