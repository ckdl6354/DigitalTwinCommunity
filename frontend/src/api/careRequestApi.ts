
import api from "./axiosInstance";

// 돌봄 요청 데이터
export interface CareRequest {
  id: number;
  resident: {
    id: number;
    name: string;
    roomNumber: string | null;
  };
  requestType: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  completedAt: string | null;
}

// 돌봄 요청 등록 데이터
export interface CareRequestCreateRequest {
  requestType: string;
  description: string;
  priority: string;
}

// 전체 돌봄 요청 조회
export const getCareRequests = async (): Promise<CareRequest[]> => {
  const response = await api.get<CareRequest[]>("/careRequest");
  return response.data;
};

// 돌봄 요청 등록
export const createCareRequest = async (
  residentId: number,
  data: CareRequestCreateRequest
): Promise<CareRequest> => {
  const response = await api.post<CareRequest>(
    `/careRequest/${residentId}`,
    data
  );
  return response.data;
};

// 돌봄 요청 상태 변경
export const updateCareRequestStatus = async (
  id: number,
  status: string
): Promise<CareRequest> => {
  const response = await api.put<CareRequest>(
    `/careRequest/${id}`,
    { status }
  );
  return response.data;
};
