import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'templates' })
export class TemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  markup: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  style: string;

  @Column({ type: 'simple-json', nullable: true, default: '{}' })
  data: string;

  @Column({ type: 'simple-json', nullable: true, default: '{}' })
  meta: string;

  @ManyToOne(() => User, (user) => user.templates)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
