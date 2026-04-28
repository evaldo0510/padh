import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
        {" "}
        <Sun className="spiritual-icon" />{" "}
      </Button>
    );
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 px-0 hover:bg-primary/10 transition-colors"
    >
      {" "}
      {theme === "dark" ? (
        <Sun className="spiritual-icon text-primary transition-transform hover:rotate-45" />
      ) : (
        <Moon className="spiritual-icon text-primary transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">Alternar tema</span>{" "}
    </Button>
  );
}
