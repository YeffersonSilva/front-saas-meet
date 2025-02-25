// src/components/company-modal.tsx
"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyModalProps {
  onCompanyCreated?: () => void;
}

export function CompanyModal({ onCompanyCreated }: CompanyModalProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [logo, setLogo] = React.useState("");
  const [primaryColor, setPrimaryColor] = React.useState("");
  const [secondaryColor, setSecondaryColor] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Obtener el token (asegúrate de que se haya almacenado tras el login)
      const token = localStorage.getItem("token");

      const res = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, logo, primaryColor, secondaryColor }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao criar empresa");
      }
      // Reiniciar el formulario y cerrar el modal
      setName("");
      setLogo("");
      setPrimaryColor("");
      setSecondaryColor("");
      setOpen(false);
      if (onCompanyCreated) onCompanyCreated();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white">
          Criar Empresa
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-background rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold text-violet-500">
            Nova Empresa
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            Preencha os dados para criar uma nova empresa.
          </Dialog.Description>
          {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="companyName">Nome</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Nome da empresa"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyLogo">Logo (URL)</Label>
              <Input
                id="companyLogo"
                type="text"
                placeholder="URL do logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <Input
                id="primaryColor"
                type="text"
                placeholder="#000000"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <Input
                id="secondaryColor"
                type="text"
                placeholder="#ffffff"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Dialog.Close asChild>
                <Button variant="ghost">Cancelar</Button>
              </Dialog.Close>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
