// components/ThemeToggleButton.tsx
'use client';

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Pizza } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="hidden md:inline-flex items-center gap-2"
    >
      <Pizza /> Theme
    </Button>
  );
}
