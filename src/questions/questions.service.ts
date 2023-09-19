import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IQuestion } from './interfaces/question.interface';
import { EnvKey } from 'common/constants/env-key.constant';
import { Question } from 'storage/entities/Question.entity';

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
    return this.questionsRepository.find();
  }
}
