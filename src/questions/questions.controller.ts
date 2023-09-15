import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { IQuestion } from './interfaces/question.inteface';
import { QuestionsService } from './questions.service';
import { LoggingInterceptor } from 'common/interceptor/logging.interceptor';
import { TransformInterceptor } from 'common/interceptor/transform.interceptor';

@Controller('questions')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(): Promise<IQuestion[]> {
    return this.questionsService.getAllQuestions();
  }
}
