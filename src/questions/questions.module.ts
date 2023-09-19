import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { StorageModule } from 'storage/storage.module';

@Module({
  imports: [StorageModule.getMySQLModule()],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
