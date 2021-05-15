import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateEntity } from './template';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TemplateEntity, (templates) => templates.user)
  templates: TemplateEntity[];

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false, unique: false })
  password: string;

  @Column({ type: 'boolean', nullable: true, unique: false })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
