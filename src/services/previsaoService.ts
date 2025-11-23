import type { Previsao } from "../types/apiTypes";

export async function getPrevisao(cidade: string): Promise<Previsao> {
  const res = await fetch(`http://localhost:3000/api/previsao?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar previsão");
  return res.json();
}
