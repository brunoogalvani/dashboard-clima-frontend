export interface PrevisaoDia {
  data: string;
  temp_min: number;
  temp_max: number;
  condicao: string;
  icone: string;
  chance_chuva: number;
  umidade: number;
}


export interface Previsao {
  cidade: string;
  pais: string;
  atualizado_em: string;
  horario_local: string;
  fuso_horario: string;
  dias: PrevisaoDia[];
}






export async function getPrevisao(cidade: string, dias: number = 5): Promise<Previsao> {
    const res = await fetch(`http://localhost:3000/api/previsao?cidade=${cidade}&dias=${dias}`);
    
    const data = await res.json();
    if (!res.ok) throw new Error("Erro ao buscar previsão");

    return data;


    
}