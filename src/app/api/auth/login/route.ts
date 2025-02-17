// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Extraer el body de la petición
    const body = await request.json();
    console.log("API login - Request body:", body);
    
    // Verifica que BACKEND_URL esté definido
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error("BACKEND_URL is not defined in the environment variables");
    }
    
    // Realizar la petición al backend
    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    // Extraer la respuesta
    const data = await res.json();
    console.log("API login - Backend response:", res.status, data);
    
    // Si el backend responde 401, imprime un mensaje adicional en consola
    if (res.status === 401) {
      console.error("Backend login returned 401. Verifica que las credenciales sean correctas y que el payload sea el esperado.");
    }
    
    // Retornar la respuesta con el mismo status del backend
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("API login error:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
