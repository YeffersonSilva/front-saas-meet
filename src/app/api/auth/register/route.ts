// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("API register - Request body:", body);

    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error("BACKEND_URL não está definido nas variáveis de ambiente");
    }

    const res = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("API register - Backend response:", res.status, data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("API register error:", err);
    return NextResponse.json(
      { message: err.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
