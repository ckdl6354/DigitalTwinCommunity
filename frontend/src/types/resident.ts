
export interface Resident {
  id: number;
  name: string;
  age: number | null;
  roomNumber: string | null;
  status: string | null;
  admissionDate: string | null;
  gender: string | null;
  birthDate: string | null;
  careLevel: string | null;
  createdAt: string | null;
}

export interface ResidentCreateRequest {
  name: string;
  age: number;
  roomNumber: string;
  gender: string;
  careLevel: string;
  status: string;
}
