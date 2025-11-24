import type { Clima, Previsao, Incendios, QualidadeAr, ApiErro } from "../types/apiTypes";

export interface Dados {
    clima: Clima | ApiErro,
    previsao: Previsao | ApiErro;
    qualidade: QualidadeAr | ApiErro,
    incendios: Incendios
}

export async function buscarDadosGerais(cidade: string): Promise<Dados> {
  const res = await fetch(`http://localhost:3000/api/dados?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}
