// src/app/(main)/layout.tsx
import "../globals.css";
import { cn } from "@/lib/utils";
import { MenuBar } from "@/components/menu-bar";
// import { ThemeToggle } from "@/components/theme-toggle"; // Se desejar incluir

export const metadata = {
  title: "Reserva Barber",
  description: "Aplicativo para reservas",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("min-h-screen bg-black text-violet-500")}>
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          {/* Aqui você pode incluir o ThemeToggle se desejar */}
          <MenuBar />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-4">{children}</main>
    </div>
  );
}
