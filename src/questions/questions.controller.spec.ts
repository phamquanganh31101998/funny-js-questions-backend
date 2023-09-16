import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { IQuestion } from './interfaces/question.interface';

jest.mock('./questions.service');

describe('QuestionsController', () => {
  let controller: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllQuestions', () => {
    it('should return array of questions', async () => {
      const expectedResult = [] as IQuestion[];

      const result = await controller.getAllQuestions();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
