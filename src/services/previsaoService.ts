import type { Previsao } from "../types/apiTypes";
import { BASE_API_URL } from "../config/apiConfig";

export async function getPrevisao(cidade: string): Promise<Previsao> {
  const res = await fetch(`${BASE_API_URL}/api/previsao?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar previsão");
  return res.json();
}
