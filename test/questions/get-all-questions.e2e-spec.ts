import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { QuestionsModule } from 'questions/questions.module';
import { QuestionsService } from 'questions/questions.service';
import { INestApplication } from '@nestjs/common';

const apiUrl = '/questions';

describe('Questions', () => {
  let app: INestApplication;
  const questionsService = { getAllQuestions: () => [] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [QuestionsModule],
    })
      .overrideProvider(QuestionsService)
      .useValue(questionsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET questions`, async () => {
    const result = await request(app.getHttpServer()).get(apiUrl);
    expect(result.statusCode).toBe(200);
    expect(result.body).toStrictEqual({ data: [] });
  });

  afterAll(async () => {
    await app.close();
  });
});
