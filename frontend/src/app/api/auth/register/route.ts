
import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.API_INTERNAL_URL || "http://localhost:8000/api/v1";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { detail: "Unable to connect to authentication server" },
      { status: 502 }
    );
  }
}
