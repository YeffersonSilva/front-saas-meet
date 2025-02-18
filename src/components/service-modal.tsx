// src/components/service-modal.tsx
"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceModalProps {
  onServiceCreated?: () => void;
}

export function ServiceModal({ onServiceCreated }: ServiceModalProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [duration, setDuration] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Obter o token do localStorage
      const token = localStorage.getItem("token");

      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, description, duration }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao criar serviço");
      }
      // Reiniciar o formulário e fechar o modal
      setName("");
      setDescription("");
      setDuration(0);
      setOpen(false);
      if (onServiceCreated) onServiceCreated();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white">
          Criar Serviço
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-background rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold text-violet-500">
            Novo Serviço
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            Preencha os dados para criar um novo serviço.
          </Dialog.Description>
          {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="serviceName">Nome</Label>
              <Input
                id="serviceName"
                type="text"
                placeholder="Nome do serviço"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="serviceDescription">Descrição</Label>
              <Input
                id="serviceDescription"
                type="text"
                placeholder="Descrição do serviço"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="serviceDuration">Duração (minutos)</Label>
              <Input
                id="serviceDuration"
                type="number"
                placeholder="Ex: 30"
                required
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
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
