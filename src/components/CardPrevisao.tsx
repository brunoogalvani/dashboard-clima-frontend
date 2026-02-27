import { useState } from "react";
import { DateTime } from "luxon";
import type { Previsao, Clima } from "../types/apiTypes";

interface Props {
  cidade: string;
  previsao: Previsao | null;
  clima: Clima | null
}

export default function CardPrevisao({ cidade, previsao, clima }: Props) {
  const [diasVisiveis, setDiasVisiveis] = useState(7)

  if (!previsao || !clima) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center text-gray-700 animate-fade-in-scale hover:scale-103 hover:-translate-y-1 hover:shadow-emerald-500/20 transition-all duration-500 ease-in-out">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Previsão indisponível</h2>
        <p className="text-sm">Não foi possível obter previsão para <strong>{cidade}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="p-2 bg-white/10 rounded-xl text-black">
      <div className="mb-5 bg-white rounded-lg p-3 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-103 transition-all duration-300 animate-fade-in animation-delay-100">
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
          <div className="bg-gray-100/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Sensação</p>
            <p className="text-sm font-semibold text-gray-800">
              {Math.round(clima.sensacao)}°C
            </p>
          </div>
          <div className="bg-gray-100/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Umidade</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.umidade}%
            </p>
          </div>
          <div className="bg-gray-100/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Vento</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.vento_kph} km/h
            </p>
          </div>
          <div className="bg-gray-100/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Período</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.dia ? "☀️ Dia" : "🌙 Noite"}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">
        Previsão para {cidade}
      </h2>
      <div className="mb-4">
        <select
          value={diasVisiveis}
          onChange={(e) => setDiasVisiveis(Number(e.target.value))}
          className="bg-white p-1 rounded"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} dia{i > 0 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
    
      <div className="w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 px-2 flex-nowrap">
          {previsao.dias.slice(0, diasVisiveis).map((dia, index) => (
            <div key={index} className="w-64 min-w-[16rem] bg-white rounded-lg p-3 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-103 transition-all duration-300 animate-fade-in animation-delay-100">
              <p className="font-semibold mb-1">{DateTime.fromISO(dia.data).setLocale("pt-BR").toFormat("dd/MM, ccc")}</p>

              <p>
                <span className="font-semibold">Máx: </span>
                {Math.round(dia.temperatura_max)}°C
              </p>

              <p>
                <span className="font-semibold">Min: </span>
                {Math.round(dia.temperatura_min)}°C
              </p>

              <p>
                <span className="font-semibold">Chuva: </span>
                {dia.probabilidade_chuva}%
              </p>

              <p>
                <span className="font-semibold">Nascer do Sol: </span>
                {dia.nascer_do_sol}
              </p>

              <p>
                <span className="font-semibold">Pôr do Sol: </span>
                {dia.por_do_sol}
              </p>
            </div>
          ))}
        </div>
      </div>
          
    </div>
  );
}
