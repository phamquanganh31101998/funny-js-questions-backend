export interface IQuestion {
  text: string;
  answers: Answer[];
  correctAnswerId: number;
  isActive: boolean;
}

interface Answer {
  id: number;
  value: string;
}
