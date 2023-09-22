import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { LoggingInterceptor } from 'common/interceptor/logging.interceptor';
import { TransformInterceptor } from 'common/interceptor/transform.interceptor';
import { Question } from '../storage/entities/Question.entity';
import { ValidationPipe } from '../common/pipe/validation.pipe';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateAnswerForQuestionDto } from './dtos/create-answer-for-question.dto';

@Controller('questions')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }

  @Post()
  async createQuestion(
    @Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Post('/:questionId/answer')
  async createAnswerForQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body(new ValidationPipe())
    createAnswerForQuestionDto: CreateAnswerForQuestionDto,
  ): Promise<Question> {
    return this.questionsService.createAnswerForQuestion(
      questionId,
      createAnswerForQuestionDto,
    );
  }
}
