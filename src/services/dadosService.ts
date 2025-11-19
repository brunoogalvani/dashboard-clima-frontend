import type { Clima } from "./climaService";
import type { Incendios } from "./incendiosService";
import type { QualidadeAr } from "./qualidadeService";

export interface Dados {
    clima: Clima,
    qualidade: QualidadeAr,
    incendios: Incendios
    previsao?: any;
}

export async function buscarDadosGerais(cidade: string): Promise<Dados> {
  const res = await fetch(`http://localhost:3000/api/dados?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}