
import api from "./axiosInstance";
import type {
  Resident,
  ResidentCreateRequest,
} from "../types/resident";

// 전체 입주민 조회
export const getResidents = async (): Promise<Resident[]> => {
  const response = await api.get<Resident[]>("/residents");
  return response.data;
};

// 입주민 등록
export const createResident = async (
  data: ResidentCreateRequest
): Promise<Resident> => {
  const response = await api.post<Resident>("/residents", data);
  return response.data;
};
