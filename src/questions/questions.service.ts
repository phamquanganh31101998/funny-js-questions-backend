import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQuestion } from './interfaces/question.interface';
import { EnvKey } from 'common/constants/env-key.constant';

@Injectable()
export class QuestionsService {
  private questionList: IQuestion[] = [];
  private logger = new Logger(QuestionsService.name);

  constructor(private configService: ConfigService) {}

  async getAllQuestions(): Promise<IQuestion[]> {
    this.logger.verbose(this.configService.get<string>(EnvKey.DB_NAME));
    return this.questionList;
  }
}
