import type { Clima } from "../types/apiTypes";
import { BASE_API_URL } from "../config/apiConfig";

export async function buscarClima(cidade: string): Promise<Clima> {
  const res = await fetch(`${BASE_API_URL}/api/clima?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar clima");
  return res.json();
}
