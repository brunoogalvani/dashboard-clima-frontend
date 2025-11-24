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
  horario_local: string;
  fuso_horario: string;
}

export interface DiaPrevisao {
  data: string;
  temperatura_max: number;
  temperatura_min: number;
  probabilidade_chuva: number;
  nascer_do_sol: string;
  por_do_sol: string;
}

export interface Previsao {
  dias: DiaPrevisao[];
}

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

export interface CidadeSugestao {
  id: string;
  name: string;
  countryCode: string;
}

export interface ApiErro {
  erro: string;
}
