import type { Clima } from "../types/apiTypes";

export async function buscarClima(cidade: string): Promise<Clima> {
  const res = await fetch(`http://localhost:3000/api/clima?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar clima");
  return res.json();
}
