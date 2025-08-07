import {
  CHARACTER,
  GAME_MODE,
  PART_MECHANISM,
  QUESTION_TYPE,
} from "./common.type";

export interface ITopic {
  _id: string;
  name: string;
  description?: string;
  mediaUrl?: string;
  gameMode: GAME_MODE;
  character?: CHARACTER;
  parts: IPart[];
}

export interface IPart {
  _id: string;
  type: PART_MECHANISM;
  questions: IQuestion[];
}

export interface IQuestion {
  _id?: string;
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
