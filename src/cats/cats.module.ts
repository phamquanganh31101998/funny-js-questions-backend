import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsService as MockCatsService } from './__mocks__/cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    // { provide: CatsService, useClass: MockCatsService }
  ],
  exports: [CatsService],
})
export class CatsModule {}
