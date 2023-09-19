import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: true })
  isActive: boolean;
}
