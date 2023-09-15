import { Injectable } from '@nestjs/common';
import { IQuestion } from '../interfaces/question.interface';

@Injectable()
export class QuestionsService {
  async getAllQuestions(): Promise<IQuestion[]> {
    return [];
  }
}
