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
  question: Question;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(partial: Partial<Answer>) {
    Object.assign(this, partial);
  }
}
