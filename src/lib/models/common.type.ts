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

export enum PART_MECHANISM {
  NORMAL = "NORMAL",
  MEMORY_GAME = "MEMORY_GAME",
  FAST_QUESTION = "FAST_QUESTION",
  CROSSWORD = "CROSSWORD",
  NPC = "NPC",
}

export enum QUESTION_TYPE {
  // MATCH_ALL = "MATCH_ALL",
  // MATCH_ANY = "MATCH_ANY",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE", // Can be a text or a picture or both -> match all
  ORDERING_HORIZONTAL = "ORDERING_HORIZONTAL", // ordering of text or text by picture -> match all
  ORDERING_VERTICAL = "ORDERING_VERTICAL", // ordering of text or text by picture -> match all
  ORDERING_CERCILE = "ORDERING_CERCILE", // ordering of text or text by picture -> match all
  ORDERING_CART = "ORDERING_CART", // ordering of text or text by picture -> match all
  ORDERING_TWO_CART = "ORDERING_TWO_CART", // ordering of text or text by picture -> match all
  TRUE_FALSE = "TRUE_FALSE", // True or False -> match all
  SELECT_SOME = "SELECT_SOME", // Select some -> match all
  FLIP_CARD = "FLIP_CARD", // Flip card -> match all
}

export enum CHARACTER {
  SMALL_LEAF = "SMALL_LEAF",
  EXPLORER = "EXPLORER",
  SCIENTIST = "SCIENTIST",
}
