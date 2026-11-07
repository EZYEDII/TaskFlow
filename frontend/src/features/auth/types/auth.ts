
export interface User {
  id: number;
  email: string;
  full_name: string;
}

export interface RegisterData {
  email: string;
  full_name: string;
  password: string;
}
