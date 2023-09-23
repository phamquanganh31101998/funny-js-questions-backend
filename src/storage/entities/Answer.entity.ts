import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Question } from './Question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ default: true })
  isActive: boolean;

  @RelationId((answer: Answer) => answer.question)
  @Column({ nullable: false })
  questionId: number;

  @ManyToOne(() => Question, (question) => question.answers, {})
  @Exclude()
  question: Question;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date | null;

  constructor(partial: Partial<Answer>) {
    Object.assign(this, partial);
  }
}
