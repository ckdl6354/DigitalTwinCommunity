
import api from "./axiosInstance";

// 백엔드 건강 기록 데이터
export interface HealthRecord {
  id: number;
  resident: {
    id: number;
    name: string;
    roomNumber: string;
  };
  measurementType: string;
  measurementValue: number;
  measurementUnit: string;
  recordedAt: string;
  memo: string | null;
}

// 건강 기록 등록 및 수정 요청
export interface HealthRecordRequest {
  measurementType: string;
  measurementValue: number;
  measurementUnit: string;
  recordedAt?: string;
  memo?: string;
}

// 전체 건강 기록 조회
export const getHealthRecords = async (): Promise<HealthRecord[]> => {
  const response = await api.get<HealthRecord[]>("/health-records");
  return response.data;
};

// 건강 기록 등록
export const createHealthRecord = async (
  residentId: number,
  data: HealthRecordRequest
): Promise<HealthRecord> => {
  const response = await api.post<HealthRecord>(
    `/health-records/residents/${residentId}`,
    data
  );
  return response.data;
};

// 건강 기록 수정
export const updateHealthRecord = async (
  id: number,
  data: HealthRecordRequest
): Promise<HealthRecord> => {
  const response = await api.put<HealthRecord>(
    `/health-records/${id}`,
    data
  );
  return response.data;
};

// 건강 기록 삭제
export const deleteHealthRecord = async (id: number): Promise<void> => {
  await api.delete(`/health-records/${id}`);
};
