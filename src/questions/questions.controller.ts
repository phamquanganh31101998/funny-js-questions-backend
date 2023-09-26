import {
  Body,
  ClassSerializerInterceptor,
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
import { IApiResponse } from '../common/interfaces/api-response.interface';

@Controller('questions')
@Controller({ version: '1' })
@UseInterceptors(
  LoggingInterceptor,
  TransformInterceptor,
  ClassSerializerInterceptor,
)
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(): Promise<IApiResponse<Question[]>> {
    const allQuestions = await this.questionsService.getAllQuestions();
    return {
      code: 200,
      message: 'Get all questions success!',
      data: allQuestions,
    };
  }

  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
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
