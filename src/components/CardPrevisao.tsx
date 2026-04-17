import { useState } from "react";
import { DateTime } from "luxon";
import { CalendarDays, CloudRain, Sunrise, Sunset, ThermometerSun, ThermometerSnowflake } from "lucide-react";
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
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-slate-700 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center text-gray-700 dark:text-slate-200 animate-fade-in-scale hover:scale-103 hover:-translate-y-1 hover:shadow-emerald-500/20 transition-all duration-500 ease-in-out">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">Previsão indisponível</h2>
        <p className="text-sm">Não foi possível obter previsão para <strong>{cidade}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="p-2 bg-white/10 dark:bg-slate-900/30 rounded-xl text-black dark:text-slate-100">
      <div className="mb-5 bg-white dark:bg-slate-800 rounded-lg p-3 border border-emerald-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-103 transition-all duration-300 animate-fade-in animation-delay-100">
        <div className="text-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">
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
            <p className="text-3xl font-bold text-gray-800 dark:text-slate-100">
              {Math.round(clima.temperatura)}°
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-sm mt-1">
              {clima.condicao}
            </p>
          </div>
        </div>

        {/* Detalhes */}
        <div className="grid grid-cols-2 gap-2 mb-7">
          <div className="bg-gray-100/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Sensação</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {Math.round(clima.sensacao)}°C
            </p>
          </div>
          <div className="bg-gray-100/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Umidade</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {clima.umidade}%
            </p>
          </div>
          <div className="bg-gray-100/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Vento</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {clima.vento_kph} km/h
            </p>
          </div>
          <div className="bg-gray-100/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Período</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {clima.dia ? "☀️ Dia" : "🌙 Noite"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Previsão para {cidade}
        </h2>

        <div className="inline-flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1 border border-gray-200 dark:border-slate-700 shadow-sm">
          {[3, 7, 14].map((n) => {
            const ativo = diasVisiveis === n;
            return (
              <button
                key={n}
                onClick={() => setDiasVisiveis(n)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-0 ${
                  ativo
                    ? "bg-linear-to-r from-emerald-600 to-cyan-600 dark:from-emerald-500 dark:to-sky-500 text-white shadow-md"
                    : "text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                {n} dias
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 px-2 flex-nowrap scrollbar-previsao snap-x snap-mandatory scroll-smooth">
          {previsao.dias.slice(0, diasVisiveis).map((dia, index) => {
            const data = DateTime.fromISO(dia.data).setLocale("pt-BR");
            return (
              <div
                key={index}
                className="snap-start w-56 min-w-[14rem] bg-linear-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-4 border border-emerald-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-103 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="text-center mb-3 pb-2 border-b border-emerald-100 dark:border-slate-700">
                  <p className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                    {data.toFormat("ccc")}
                  </p>
                  <p className="text-lg font-bold text-gray-800 dark:text-slate-100">
                    {data.toFormat("dd/MM")}
                  </p>
                </div>

                <div className="flex items-center justify-around mb-3">
                  <div className="flex flex-col items-center gap-1">
                    <ThermometerSun className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                    <p className="text-xl font-bold text-gray-800 dark:text-slate-100">
                      {Math.round(dia.temperatura_max)}°
                    </p>
                    <p className="text-[10px] uppercase text-gray-500 dark:text-slate-400">Máx</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200 dark:bg-slate-700" />
                  <div className="flex flex-col items-center gap-1">
                    <ThermometerSnowflake className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                    <p className="text-xl font-bold text-gray-800 dark:text-slate-100">
                      {Math.round(dia.temperatura_min)}°
                    </p>
                    <p className="text-[10px] uppercase text-gray-500 dark:text-slate-400">Mín</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-blue-50 dark:bg-slate-700/60 rounded-lg px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span className="text-xs text-gray-600 dark:text-slate-300">Chuva</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                      {dia.probabilidade_chuva}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-amber-50 dark:bg-slate-700/60 rounded-lg px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <Sunrise className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      <span className="text-xs text-gray-600 dark:text-slate-300">Nascer</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                      {dia.nascer_do_sol}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-orange-50 dark:bg-slate-700/60 rounded-lg px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <Sunset className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      <span className="text-xs text-gray-600 dark:text-slate-300">Pôr</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                      {dia.por_do_sol}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
