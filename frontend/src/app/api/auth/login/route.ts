
import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.API_INTERNAL_URL || "http://localhost:8000/api/v1";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

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
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "Login failed" },
        { status: response.status }
      );
    }

    const result = NextResponse.json({ user: data.user });

    result.cookies.set("taskflow_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60,
    });

    return result;
  } catch {
    return NextResponse.json(
      { detail: "Unable to connect to authentication server" },
      { status: 502 }
    );
  }
}
