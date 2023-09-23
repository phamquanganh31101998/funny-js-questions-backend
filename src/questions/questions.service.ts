import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'storage/entities/Question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateAnswerForQuestionDto } from './dtos/create-answer-for-question.dto';
import { Answer } from '../storage/entities/Answer.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class QuestionsService {
  private logger = new Logger(QuestionsService.name);

  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    // caching result
    const cacheKey = 'query-get-all-questions';
    const cachedResult = (await this.cacheManager.get(cacheKey)) as Question[];

    let allQuestions: Question[] = [];

    if (!cachedResult) {
      allQuestions = await this.questionsRepository.find({
        relations: {
          answers: true,
        },
      });

      if (!!allQuestions.length) {
        await this.cacheManager.set(cacheKey, allQuestions);
      }
    } else {
      allQuestions = cachedResult;
    }

    return allQuestions;
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
