import React, { useState, useEffect, useRef } from "react";
import type { CidadeSugestao } from "../types/apiTypes";

function InputAutocompleteCidade({
  onSelect,
  value,
  setValue,
  disabled = false,
}: {
  onSelect: (cidade: string) => void;
  value: string;
  setValue: (cidade: string) => void;
  disabled?: boolean;
}) {
  const [sugestoes, setSugestoes] = useState<CidadeSugestao[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length < 3) {
      setSugestoes([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const API_KEY = "Ga2J5fbWCKhjKkgcvf5qwn41QzIsd9";
        const res = await fetch(
          `https://data-api.oxilor.com/rest/search-regions?type=city&first=5&searchTerm=${encodeURIComponent(
            value
          )}&key=${API_KEY}`
        );
        const json = await res.json();

        const items = json.map((edge: any) => ({
          id: edge.id,
          name: edge.name,
          countryCode: edge.countryCode,
        }));

        setSugestoes(items);
      } catch (err) {
        console.error("Erro ao buscar cidades:", err);
        setSugestoes([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cidade: string) => {
    setValue(cidade);
    setFocused(false);
    setSugestoes([]);
    onSelect(cidade);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      setFocused(false);
      setSugestoes([]);
      onSelect(value);
    }
  };

  return (
    <div ref={containerRef} className="flex-1 relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKeyPress}
        placeholder="Digite a cidade"
        disabled={disabled}
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      />

      {focused && sugestoes.length > 0 && (
        <ul className="absolute bg-white border border-gray-200 mt-1 w-full max-h-52 overflow-auto shadow-lg rounded-xl z-9999">
          {sugestoes.map((cidade) => (
            <li
              key={cidade.id}
              className="px-4 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer transition-colors"
              onMouseDown={() => handleSelect(cidade.name)}
            >
              {cidade.name} ({cidade.countryCode})
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <div className="absolute right-3 top-4 text-sm text-gray-500 animate-pulse">
          Carregando...
        </div>
      )}
    </div>
  );
}

export default InputAutocompleteCidade;
