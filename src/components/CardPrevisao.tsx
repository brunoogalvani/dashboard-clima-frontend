import type { Previsao } from "../services/previsaoService";


interface Props {
  cidade: string;
  previsao: Previsao | null;
}

export default function CardPrevisao({ cidade, previsao }: Props) {

  if (!previsao) {
    return (
      <div className="p-4 bg-white/10 rounded-xl text-white text-center">
        <h2 className="text-xl font-semibold mb-2">Previsão indisponível</h2>
        <p>Não foi possível obter previsão para <strong>{cidade}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/10 rounded-xl text-white">
      <h2 className="text-xl font-semibold mb-3">
        Previsão para {previsao.cidade}, {previsao.pais}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {previsao.dias.map((dia, index) => (
          <div key={index} className="p-3 bg-white/5 rounded-lg">
            <p className="font-semibold">{dia.data}</p>
            <img src={dia.icone} alt={dia.condicao} className="w-12 h-12" />
            <p>{dia.condicao}</p>
            <p>Mín: {dia.temp_min}°C</p>
            <p>Máx: {dia.temp_max}°C</p>
            <p>Umidade: {dia.umidade}%</p>
            <p>Chuva: {dia.chance_chuva}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
