export interface ISession {
  topicId: string;
  startAt: Date;
  endAt?: Date;
  players: {
    playerId: string;
    email: string;
    isHost: boolean;
    characterId: string;
    score: number;
  }[];
  userAnswers: {
    playerId: string;
    questionId: string;
    answer: string[];
    answeredAt: Date;
    isCorrect: boolean;
  }[];
}
