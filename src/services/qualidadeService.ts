export interface Poluente {
  tipo: string;
  valor: number;
}

export interface QualidadeAr {
  aqi: number;
  dominancia: string;
  poluentes?: Poluente[];
  pm25?: number | null;
  pm10?: number | null;
  o3?: number | null;
  hora_atualizada?: string;
}

export async function buscarQualidadeAr(cidade: string): Promise<QualidadeAr> {
  const res = await fetch(`http://localhost:3000/api/qualidade?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar qualidade do ar");
  const data = await res.json();

  const pm25 = data.poluentes?.find((p: any) => p.tipo === "pm25")?.valor ?? null;
  const pm10 = data.poluentes?.find((p: any) => p.tipo === "pm10")?.valor ?? null;
  const no2 = data.poluentes?.find((p: any) => p.tipo === "no2")?.valor ?? null;
  const o3 = data.poluentes?.find((p: any) => p.tipo === "o3")?.valor ?? null;

  return {
    aqi: data.aqi,
    dominancia: data.dominancia || "-",
    poluentes: data.poluentes,
    hora_atualizada: data.hora_atualizada || "-",
  };
}
