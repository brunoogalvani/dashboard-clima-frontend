import type { Dados } from "../types/apiTypes";
import { BASE_API_URL } from "../config/apiConfig";

export async function buscarDadosGerais(cidade: string): Promise<Dados> {
  const res = await fetch(`${BASE_API_URL}/api/dados?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}

export async function buscarDadosPorCoordenadas(lat: number, lon: number): Promise<Dados> {
  const res = await fetch(`${BASE_API_URL}/api/dados?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}
