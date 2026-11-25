
import api from "./axiosInstance";

export interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  roomType: string;
  status: string;
  area: number;
  capacity: number;
  occupied: number;
}

export interface RoomCreateRequest {
  roomNumber: string;
  floor: number;
  roomType: string;
  status: string;
  area: number;
  capacity: number;
}

export const getRooms = async (): Promise<Room[]> => {
  const response = await api.get<Room[]>("/rooms");
  return response.data;
};

export const createRoom = async (
  data: RoomCreateRequest
): Promise<Room> => {
  const response = await api.post<Room>("/rooms", data);
  return response.data;
};

export const updateRoom = async (
  id: number,
  data: RoomCreateRequest
): Promise<Room> => {
  const response = await api.put<Room>(`/rooms/${id}`, data);
  return response.data;
};

export const deleteRoom = async (id: number): Promise<void> => {
  await api.delete(`/rooms/${id}`);
};

export const getRoomOccupancy = async (
  id: number
): Promise<number> => {
  const response = await api.get<number>(`/rooms/${id}/occupancy`);
  return response.data;
};
