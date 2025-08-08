export interface Model {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  save(): Promise<Model>;
  toObject(): unknown;
}

export interface IFormState {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: unknown;
}

export interface IAudit {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface IAPIResponse<T> {
  data: T;
  success: boolean;
  code: number;
}

export interface IPaginationResponse<T> extends IAPIResponse<T> {
  page: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
}

export interface IPaginationRequest extends URLSearchParams {
  pageIndex: number | 1;
  pageSize: number | 10;
  keyword: string | "";
}

export const ANONYMOUS = "anonymous";

export enum GAME_MODE {
  STORY = "STORY",
  FIGHTING = "FIGHTING",
  EVENT = "EVENT",
}

export enum GAME_STATUS {
  READYING = "READYING",
  ANSWERING = "ANSWERING",
  FINISHED = "FINISHED",
}

export enum QUESTION_TYPE {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE", // Can be a text or a picture or both -> match all
  ORDERING_HORIZONTAL = "ORDERING_HORIZONTAL", // ordering of text or text by picture -> match all
  ORDERING_VERTICAL = "ORDERING_VERTICAL", // ordering of text or text by picture -> match all
  ORDERING_CERCILE = "ORDERING_CERCILE", // ordering of text or text by picture -> match all
  ORDERING_TWO_CART = "ORDERING_TWO_CART", // ordering of text or text by picture -> match all
  ORDERING_THREE_CART = "ORDERING_THREE_CART", // ordering of text or text by picture -> match all
  ORDERING_FLOATING_CART = "ORDERING_CART", // ordering of text or text by picture -> match all
  ORDERING_FLOATING_TWO_CART = "ORDERING_FLOATING_TWO_CART", // ordering of text or text by picture -> match all
  TRUE_FALSE = "TRUE_FALSE", // True or False -> match all
  TRUE_FALSE_CARD = "TRUE_FALSE_CARD", // True or False -> match all
  SELECT_SOME = "SELECT_SOME", // Select some -> match all
  SELECT_FLIP_CARD = "FLIP_CARD", // Flip card -> match all
  SELECT_MAP = "SELECT_MAP", // Select map -> match >=40%
  MEMMORY_CARD = "MEMMORY_CARD", // Memory card -> match all
  MEMMORY_GAME = "MEMMORY_GAME", // Memory game -> match all -> max 1min for all
  CROSSWORD = "CROSSWORD", // Crossword -> match all or match final answer
  PUZZLE = "PUZZLE", // Puzzle -> match all
  MYSTERY_BOX = "MYSTERY_BOX", // Mystery box -> match all
  FAST_QUESTION = "FAST_QUESTION", // Fast question -> match all -> 30s for all
  FIGHT_WITH_NPC = "FIGHT_WITH_NPC", // Fight with NPC -> match all -> 10s per question
  CORRECT_WORD = "CORRECT_WORD", // Correct word -> match all
  COMPLETE_PARAGRAPH = "COMPLETE_PARAGRAPH", // Complete paragraph -> match all
  REMOVE_WORD = "REMOVE_WORD", // Remove word -> match all
  FIND_WORDS = "FIND_WORDS", // Find words -> match all
}

export enum CHARACTER {
  SMALL_LEAF = "SMALL_LEAF",
  EXPLORER = "EXPLORER",
  SCIENTIST = "SCIENTIST",
}
