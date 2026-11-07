import type {
  AuthResponse,
  RegisterData,
  User,
} from "../types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const body = new URLSearchParams({
      username: email,
      password,
    });

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    return response.json();
  },
};