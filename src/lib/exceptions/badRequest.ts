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
};

export default BAD_REQUEST_ERROR;
