import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'templates' })
export class TemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
