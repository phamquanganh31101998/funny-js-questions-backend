import { DynamicModule, Module } from '@nestjs/common';
import { MysqlService } from './mysql/mysql.service';

@Module({
  providers: [MysqlService],
})
export class StorageModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StorageModule,
      imports: [],
    };
  }
}
