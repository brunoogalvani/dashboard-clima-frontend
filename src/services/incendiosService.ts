import type { Incendios } from "../types/apiTypes";
import { BASE_API_URL } from "../config/apiConfig";

export async function buscarIncendios(cidade: string): Promise<Incendios> {
  const res = await fetch(`${BASE_API_URL}/api/incendios?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar incêndios");
  return res.json();
}
