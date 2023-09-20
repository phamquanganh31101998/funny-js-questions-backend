import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from './Answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Answer, (answer) => answer.questionId, {})
  answers: Answer[];
}
