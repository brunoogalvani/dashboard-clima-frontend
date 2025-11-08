export interface QualidadeAr {
  aqi: number;
  dominante: string;
  pm25?: number;
  pm10?: number;
  no2?: number;
  o3?: number;
  atualizado_em: string;
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
    dominante: data.dominancia || "-",
    pm25,
    pm10,
    no2,
    o3,
    atualizado_em: data.hora_atualizada || "-",
  };
}
