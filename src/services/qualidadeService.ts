import type { QualidadeAr } from '../types/apiTypes'
import { BASE_API_URL } from '../config/apiConfig';

export async function buscarQualidadeAr(cidade: string): Promise<QualidadeAr> {
  const res = await fetch(`${BASE_API_URL}/api/qualidade?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar qualidade do ar");
  const data = await res.json();

  return {
    aqi: data.aqi,
    dominancia: data.dominancia || "-",
    poluentes: data.poluentes,
    hora_atualizada: data.hora_atualizada || "-",
  };
}
