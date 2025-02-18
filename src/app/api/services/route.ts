// src/app/api/services/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Obter o header Authorization da requisição
    const authHeader = request.headers.get("authorization");

    const res = await fetch(`${process.env.BACKEND_URL}/services`, {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Erro na API GET de serviços:", err);
    return NextResponse.json(
      { message: err.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    const res = await fetch(`${process.env.BACKEND_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Erro na API POST de serviços:", err);
    return NextResponse.json(
      { message: err.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
