const BAD_REQUEST_ERROR = {
  unauthorized: {
    code: 401,
    message: "Chưa xác thực",
  },
  forbidden: {
    code: 403,
    message: "Không có quyền",
  },
  invalidRequest: {
    code: 400,
    message: "Yêu cầu không hợp lệ",
  },
  inASession: {
    code: 400,
    message: "Bạn đang trong một phiên trò chơi",
  },
  notHaveFile: {
    code: 400,
    message: "Không có file",
  },
  topicRequired: {
    code: 400,
    message: "Chủ đề không được bỏ trống",
  },
  storyModeTopicExists: {
    code: 400,
    message: "Chủ đề của chế độ cốt truyện đã tồn tại",
  },
  notAHost: {
    code: 400,
    message: "Bạn không phải người chủ trì",
  },
  gameStarted: {
    code: 400,
    message: "Phiên trò chơi đã bắt đầu",
  },
  cantJoinThisSession: {
    code: 400,
    message: "Không thể tham gia phiên trò chơi này",
  },
  notInThisSession: {
    code: 400,
    message: "Không trong phiên trò chơi này",
  },
  alreadyAnswered: {
    code: 400,
    message: "Bạn đã trả lời câu hỏi này rồi!",
  },
};

export default BAD_REQUEST_ERROR;
