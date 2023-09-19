import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { IQuestion } from './interfaces/question.interface';
import { QuestionsService } from './questions.service';
import { LoggingInterceptor } from 'common/interceptor/logging.interceptor';
import { TransformInterceptor } from 'common/interceptor/transform.interceptor';
import { Question } from '../storage/entities/Question.entity';

@Controller('questions')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }
}
