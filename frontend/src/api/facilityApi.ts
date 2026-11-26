
import api from "./axiosInstance";

export interface Facility {
  id: number;
  facilityName: string;
  facilityType: string;
  floor: number;
  status: "정상 운영" | "점검 중" | "운영 중단";
  positionX: number;
  positionY: number;
  positionZ: number;
}

export interface FacilityCreateRequest {
  facilityName: string;
  facilityType: string;
  floor: number;
  status: "정상 운영" | "점검 중" | "운영 중단";
  positionX: number;
  positionY: number;
  positionZ: number;
}

// 시설 전체 조회
export const getFacilities = async (): Promise<Facility[]> => {
  const response = await api.get<Facility[]>("/facility");
  return response.data;
};

// 시설 등록
export const createFacility = async (
  data: FacilityCreateRequest
): Promise<Facility> => {
  const response = await api.post<Facility>("/facility", data);
  return response.data;
};

// 시설 삭제
export const deleteFacility = async (id: number): Promise<void> => {
  await api.delete(`/facility/${id}`);
};
