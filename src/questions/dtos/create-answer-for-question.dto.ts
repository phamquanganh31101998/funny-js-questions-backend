import { IsString } from 'class-validator';

export class CreateAnswerForQuestionDto {
  @IsString()
  text: string;
}
