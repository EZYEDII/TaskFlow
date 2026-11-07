
import type {
  RegisterData,
  User,
} from "../types/auth";

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Registration failed");
    }

    return result;
  },

  async login(email: string, password: string): Promise<User> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Login failed");
    }

    return result.user;
  },

  async logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },

  async me(): Promise<User> {
    const response = await fetch("/api/backend/auth/me", {
      cache: "no-store",
      credentials: "same-origin",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Authentication required");
    }

    return result;
  },
};
