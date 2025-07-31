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

export interface Topic {
  name: string;
  mode: TOPIC_MODE;
  description?: string;
  imageUrl?: string;
  questions?: Question[];
}

export interface Question {
  title: string;
  mediaUrl?: string;
  type: QUESTION_TYPE;
  resources?: string[];
  answer: string | string[];
}
