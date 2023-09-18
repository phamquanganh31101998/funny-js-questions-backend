import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
// import { ConfigModule } from './config/config.module';
import { QuestionsModule } from './questions/questions.module';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev.example'],
      cache: true,
      isGlobal: true,
    }),
    QuestionsModule,
    StorageModule.forRootAsync(),

    // For learning purpose only
    // CatsModule,
    // ConfigModule.forRoot({ folderPath: './config' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // use filter at global scoped
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
