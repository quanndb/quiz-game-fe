import { CHARACTER, GAME_MODE } from "./common.type";
import { ITopic } from "./topic.type";

export interface ISession {
  startAt?: Date;
  endAt?: Date;
  gameMode: GAME_MODE;
  character?: CHARACTER;
  sessionCode?: string;
  isFinished: boolean;
  players: IPlayer[];
  orderedTopics: ITopic[];
  answers: IAnswer[];
  currentPosition: {
    topicIndex: number;
    partIndex: number;
    questionIndex: number;
  };
}

export interface IPlayer {
  email: string;
  isHost: boolean;
  score: number;
}

export interface IAnswer {
  email: string;
  questionId: string;
  answer: [string[]];
  answeredAt: Date;
  isCorrect: boolean;
}
