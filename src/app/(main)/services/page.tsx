// src/app/(main)/services/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceModal } from "@/components/service-modal";

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Obtém o token armazenado (pode ser do localStorage ou de um contexto)
      const token = localStorage.getItem("token");
      const res = await fetch("/api/services", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        console.error("Erro ao buscar serviços");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-violet-500">Serviços</h1>
        <ServiceModal onServiceCreated={fetchServices} />
      </div>
      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : services.length === 0 ? (
        <p className="text-muted-foreground">Nenhum serviço encontrado.</p>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="bg-transparent border border-violet-500">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-violet-500">{service.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-1 text-sm text-violet-300">
                  Duração: {service.duration} minutos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
