import { useState, useEffect } from "react";

  type Tema = "light" | "dark";
  const STORAGE_KEY = "pima:tema";

  export function useTheme() {
    const [tema, setTema] = useState<Tema>(() => {
      const salvo = localStorage.getItem(STORAGE_KEY) as Tema | null;
      if (salvo) return salvo;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
      const root = document.documentElement;
      if (tema === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, tema);
    }, [tema]);

    const alternar = () => setTema((t) => (t === "dark" ? "light" : "dark"));

    return { tema, alternar };
  }