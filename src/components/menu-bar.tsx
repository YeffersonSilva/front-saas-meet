// src/components/menu-bar.tsx
"use client";
import { motion } from "framer-motion";
import { Home, Bell, Settings, User } from "lucide-react";
import { useTheme } from "next-themes";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Início", href: "/inicial", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "text-blue-500" },
  { icon: <Bell className="h-5 w-5" />, label: "Notificações", href: "/notificacoes", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "text-orange-500" },
  { icon: <Settings className="h-5 w-5" />, label: "Configurações", href: "/configuracoes", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)", iconColor: "text-green-500" },
  { icon: <User className="h-5 w-5" />, label: "Perfil", href: "/perfil", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "text-red-500" },
];

export function MenuBar() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <motion.nav
      className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      <ul className="flex items-center gap-2 relative z-10">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-violet-500 hover:text-white transition-colors rounded-xl"
            >
              <span className={item.iconColor}>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
