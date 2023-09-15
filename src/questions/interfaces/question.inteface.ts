export interface IQuestion {
  question: string;
  answers: Answer[];
  correctAnswerId: number;
  isActive: IsActive;
}

interface Answer {
  id: number;
  value: string;
}

enum IsActive {
  INACTIVE = 0,
  ACTIVE = 1,
}
