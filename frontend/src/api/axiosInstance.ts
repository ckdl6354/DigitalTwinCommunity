
import axios from "axios";

const api = axios.create({
  // 백엔드 API 기본 주소
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",

  // 요청 제한 시간: 10초
  timeout: 10000,

  // JSON 데이터 통신
  headers: {
    "Content-Type": "application/json",
  },
});

// API 응답 오류 공통 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message || error.message;

      console.error("[API 통신 오류]", {
        status,
        message,
      });
    } else {
      console.error("[예상하지 못한 오류]", error);
    }

    return Promise.reject(error);
  }
);

export default api;
