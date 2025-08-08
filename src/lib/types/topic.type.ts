import { CHARACTER, GAME_MODE, Model, QUESTION_TYPE } from "./common.type";

export interface ITopic {
  _id: string;
  name: string;
  description?: string;
  mediaUrl?: string;
  gameMode: GAME_MODE;
  character?: CHARACTER;
  questions: IQuestion[];
}

export interface TopicModel extends ITopic, Model {}

export interface IQuestion {
  _id: string;
  title: string;
  description?: string;
  timeLimit?: number;
  mediaUrl?: string;
  type: QUESTION_TYPE;
  resources?: IResource[];
  answer: [string[]];
}

export interface IResource {
  mediaUrl?: string;
  title?: string;
  value: string;
}
