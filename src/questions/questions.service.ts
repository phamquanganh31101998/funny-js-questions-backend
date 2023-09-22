import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvKey } from 'common/constants/env-key.constant';
import { Question } from 'storage/entities/Question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateAnswerForQuestionDto } from './dtos/create-answer-for-question.dto';
import { Answer } from '../storage/entities/Answer.entity';

@Injectable()
export class QuestionsService {
  private logger = new Logger(QuestionsService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    this.logger.verbose(this.configService.get<string>(EnvKey.DB_NAME));
    return this.questionsRepository.find({
      relations: {
        answers: true,
      },
    });
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsRepository.save(createQuestionDto);
  }

  async createAnswerForQuestion(
    questionId: number,
    createAnswerForQuestionDto: CreateAnswerForQuestionDto,
  ): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: {
        id: questionId,
      },
      relations: {
        answers: true,
      },
    });

    if (!question) {
      throw new HttpException(
        `Cannot find question with id = ${questionId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newAnswer = new Answer({ text: createAnswerForQuestionDto.text });
    const newAnswers = [...question.answers, newAnswer];

    return await this.questionsRepository.save({
      ...question,
      answers: newAnswers,
    });
  }
}
