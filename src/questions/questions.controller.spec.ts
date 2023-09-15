import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { IQuestion } from './interfaces/question.inteface';

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllQuestions', () => {
    it('should return array of questions', async () => {
      const expectedResult = [] as IQuestion[];
      jest
        .spyOn(service, 'getAllQuestions')
        .mockResolvedValueOnce(expectedResult);

      const result = await controller.getAllQuestions();

      expect(result).toBe(expectedResult);
    });
  });
});
