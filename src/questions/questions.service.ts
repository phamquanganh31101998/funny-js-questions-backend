import { Injectable } from '@nestjs/common';
import { IQuestion } from './interfaces/question.interface';

@Injectable()
export class QuestionsService {
  private questionList: IQuestion[] = [];

  async getAllQuestions(): Promise<IQuestion[]> {
    return this.questionList;
  }
}
