// src/app/(main)/layout.tsx
import "../globals.css";
import { cn } from "@/lib/utils";
import { MenuBar } from "@/components/menu-bar";
//import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Reserva Barber",
  description: "Aplicativo para reservas",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={cn("bg-black text-violet-500 min-h-screen")}>
        <header className="sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
          
          </div>
          <MenuBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
