import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Answer } from './Answer.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
    orphanedRowAction: 'nullify',
  })
  answers: Answer[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date | null;
}
