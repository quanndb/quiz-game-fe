export enum TOPIC_MODE {
  STORY = "STORY",
  FIGHTING = "FIGHTING",
  EVENT = "EVENT",
}

export enum QUESTION_TYPE {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  TYPING = "TYPING",
  ORDERING = "ORDERING",
  MATCHING = "MATCHING",
  PUZZLE = "PUZZLE",
  MYSTERY_QUIZ = "MYSTERY_QUIZ",
  FIND_DIFFERENCE = "FIND_DIFFERENCE",
}

export interface ITopic {
  name: string;
  mode: TOPIC_MODE;
  description?: string;
  imageUrl?: string;
  questions?: IQuestion[];
}

export interface IQuestion {
  title: string;
  description?: string;
  mediaUrl?: string;
  type: QUESTION_TYPE;
  resources?: IResource[];
  answer: string | string[];
}

export interface IResource {
  type: string;
  value: string;
}
