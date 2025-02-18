// src/app/(main)/company/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyModal } from "@/components/company-modal";

interface Company {
  id: number;
  name: string;
  logo: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
}

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/companies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
      } else {
        console.error("Erro ao buscar empresas");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-violet-500">Empresas</h1>
        <CompanyModal onCompanyCreated={fetchCompanies} />
      </div>
      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : companies.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma empresa encontrada.</p>
      ) : (
        <div className="grid gap-4">
          {companies.map((company) => (
            <Card key={company.id} className="bg-transparent border border-violet-500">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-violet-500">{company.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cor Primária: {company.primaryColor || "N/A"}
                </p>
                <p className="mt-1 text-sm text-violet-300">
                  Cor Secundária: {company.secondaryColor || "N/A"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
