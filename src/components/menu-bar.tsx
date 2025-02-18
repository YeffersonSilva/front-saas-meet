// src/components/menu-bar.tsx
"use client";

import * as React from "react";
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
  {
    icon: <Home className="h-5 w-5" />,
    label: "Início",
    href: "/inicial",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: "Notificações",
    href: "/notificacoes",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Configurações",
    href: "/configuracoes",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: <User className="h-5 w-5" />,
    label: "Perfil",
    href: "/perfil",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
];

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function MenuBar() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <motion.nav
      // Removemos o fundo gradiente e definimos bg-transparent
      className="p-2 rounded-2xl bg-transparent backdrop-blur-lg relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      {/* Fundo animado sutil para efeito visual */}
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? "via-purple-400/40 via-50% to-transparent"
            : "via-blue-400/20 via-50% to-transparent"
        } rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />
      {/* Container centralizado com largura máxima */}
      <ul className="mx-auto flex items-center justify-center gap-6 relative z-10 max-w-4xl">
        {menuItems.map((item) => (
          <motion.li key={item.label} className="relative">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              style={{ perspective: "600px" }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: "16px",
                }}
              />
              <motion.a
                href={item.href}
                className="flex items-center justify-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl"
                variants={itemVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
              >
                <span className={`transition-colors duration-300 ${item.iconColor}`}>
                  {item.icon}
                </span>
                <span className="text-violet-500 font-semibold">{item.label}</span>
              </motion.a>
              <motion.a
                href={item.href}
                className="flex items-center justify-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl"
                variants={backVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
              >
                <span className={`transition-colors duration-300 ${item.iconColor}`}>
                  {item.icon}
                </span>
                <span className="text-violet-500 font-semibold">{item.label}</span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
