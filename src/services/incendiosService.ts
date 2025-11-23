import type { Incendios } from "../types/apiTypes";

export async function buscarIncendios(cidade: string): Promise<Incendios> {
  const res = await fetch(`http://localhost:3000/api/incendios?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar incêndios");
  return res.json();
}
