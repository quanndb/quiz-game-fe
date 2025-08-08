import { IUserAuthorities } from "../types/account.type";
import { GAME_MODE, GAME_STATUS } from "../types/common.type";
import { SessionModel } from "../types/session.type";

export function isAbleToAnswer(session: SessionModel) {
  if (session.gameMode === GAME_MODE.STORY) {
    const currentQuestion = getCurrentQuestion(session);
    if (!currentQuestion) return false;
    currentQuestion.answer;
    return true;
  }
}

export function isCorrectAnswer(session: SessionModel) {}

export function calculateScore() {}

export function calculateRank() {}

export const isAllPlayerAnswered = (session: SessionModel) => {
  const { answers, players } = session;
  const currentQuestion = getCurrentQuestion(session);
  if (!currentQuestion) return false;
  return (
    answers.filter((a) => a.questionId === currentQuestion._id).length ===
    players.length
  );
};

export const isCurrentPlayerHost = (
  session: SessionModel,
  currentUser: IUserAuthorities
) => {
  if (session.gameMode === GAME_MODE.STORY) return true;
  return session.players.some((p) => p.email === currentUser.email && p.isHost);
};

export const getCurrentQuestion = (session: SessionModel) => {
  const { topics, currentPosition, status, endAt } = session;
  if (status !== GAME_STATUS.READYING || endAt) return null;
  const topic = topics?.[currentPosition.topicIndex];
  if (!topic) return null;
  const question = topic.questions?.[currentPosition.questionIndex];
  return question ?? null;
};

export const nextQuestion = (session: SessionModel) => {
  const { topics, currentPosition, status, endAt } = session;
  if (status !== GAME_STATUS.READYING || endAt) return null;
  const topic = topics?.[currentPosition.topicIndex];
  if (!topic) return;

  // Nếu còn câu hỏi trong topic hiện tại
  if (currentPosition.questionIndex + 1 < topic.questions.length) {
    session.currentPosition.questionIndex += 1;
  }

  // Sang topic mới nếu còn
  if (currentPosition.topicIndex + 1 < topics.length) {
    session.currentPosition.topicIndex += 1;
    session.currentPosition.questionIndex = 0;
  }
};
