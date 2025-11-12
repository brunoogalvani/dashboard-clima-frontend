import type { Clima } from "../services/climaService";

interface Props {
  clima: Clima;
}

export default function CardClima({ clima }: Props) {
  return (
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-103 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-100">
        {/* Localização */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">
            Temperatura
          </h2>
        </div>

        {/* Ícone e temp */}
        <div className="flex items-center justify-center mb-4">
          <img 
            src={clima.icone} 
            alt={clima.condicao} 
            className="w-16 h-16"
          />
          <div className="ml-3">
            <p className="text-3xl font-bold text-gray-800">
              {Math.round(clima.temperatura)}°
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {clima.condicao}
            </p>
          </div>
        </div>

        {/* Detalhes */}
        <div className="grid grid-cols-2 gap-2 mb-7">
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Sensação</p>
            <p className="text-sm font-semibold text-gray-800">
              {Math.round(clima.sensacao)}°C
            </p>
          </div>
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Umidade</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.umidade}%
            </p>
          </div>
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Vento</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.vento_kph} km/h
            </p>
          </div>
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Período</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.dia ? "☀️ Dia" : "🌙 Noite"}
            </p>
          </div>
        </div>

        {/* Última att */}
        <div className="text-center pt-2 border-t border-emerald-200">
          <p className="text-xs text-gray-500">
            {clima.atualizado_em}
          </p>
        </div>
    </div>
  );
}
