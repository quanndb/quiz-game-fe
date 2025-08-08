import { CHARACTER, GAME_MODE, GAME_STATUS, Model } from "./common.type";
import { ITopic } from "./topic.type";

export interface ISession {
  startAt?: Date;
  endAt?: Date;
  gameMode: GAME_MODE;
  character?: CHARACTER;
  sessionCode?: string;
  status: GAME_STATUS;
  lastStartAnswerAt?: Date;
  players: IPlayer[];
  topics: ITopic[];
  answers: IAnswer[];
  currentPosition: {
    topicIndex: number;
    questionIndex: number;
  };
}

export interface SessionModel extends ISession, Model {}

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
