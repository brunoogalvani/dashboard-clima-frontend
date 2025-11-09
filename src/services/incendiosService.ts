export interface Incendio {
  latitude: string;
  longitude: string;
  brightness?: string | null;
  acq_date: string;
  acq_time: string;
  satellite?: string | null;
  confidence?: string | null;
  frp?: string | null;
  version?: string | null;
  type?: string | null;
  daynight?: string | null;
}

export interface Incendios {
  cidade: string;
  lat: string;
  lon: string;
  bbox: {
    latMin: number;
    latMax: number;
    lonMin: number;
    lonMax: number;
  };
  total_incendios: number;
  incendios: Incendio[];
  fonte: string;
}


export async function buscarIncendios(cidade: string): Promise<Incendios> {
  const res = await fetch(`http://localhost:3000/api/incendios?cidade=${cidade}`);
  if (!res.ok) throw new Error("Erro ao buscar incêndios");
  return res.json();
}
