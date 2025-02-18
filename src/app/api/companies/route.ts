// src/app/api/companies/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const res = await fetch(`${process.env.BACKEND_URL}/companies`, {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Erro na API GET de empresas:", err);
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
    const res = await fetch(`${process.env.BACKEND_URL}/companies`, {
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
    console.error("Erro na API POST de empresas:", err);
    return NextResponse.json(
      { message: err.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
