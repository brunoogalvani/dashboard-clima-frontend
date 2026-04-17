import { useEffect, useState } from "react";
const STORAGE_KEY = "pima:historico-cidades"
const MAX_ITEMS = 5;

export function useHistoricoCidades(){
    const [historico, setHistorico] = useState<string[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];

        }catch{
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(historico));

    }, [historico]);

    const adicionar = (cidade: string) => {
      const nome = cidade.trim();
      if (!nome) return;
      setHistorico((atual) => {
        const semDuplicata = atual.filter(
          (c) => c.toLowerCase() !== nome.toLowerCase()
        );
        return [nome, ...semDuplicata].slice(0, MAX_ITEMS);
      });
    };

    const limpar = () => setHistorico([]);

    const remover = (cidade: string) => {
      setHistorico((atual) => atual.filter((c) => c !== cidade));
    };

    return { historico, adicionar, limpar, remover };
  }