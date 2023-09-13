import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Module({
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}
