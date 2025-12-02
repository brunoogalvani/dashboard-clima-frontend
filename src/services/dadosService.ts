import type { Dados } from "../types/apiTypes";

export async function buscarDadosGerais(cidade: string): Promise<Dados> {
  const res = await fetch(`http://localhost:3000/api/dados?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}

export async function buscarDadosPorCoordenadas(lat: number, lon: number): Promise<Dados> {
  const res = await fetch(`http://localhost:3000/api/dados?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}
