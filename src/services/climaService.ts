export interface Clima {
  cidade: string;
  pais: string;
  temperatura: number;
  dia: boolean;
  sensacao: number;
  condicao: string;
  umidade: number;
  vento_kph: number;
  icone: string;
  atualizado_em: string;
}

export async function buscarClima(cidade: string): Promise<Clima> {
  const res = await fetch(`http://localhost:3000/api/clima?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar clima");
  return res.json();
}
