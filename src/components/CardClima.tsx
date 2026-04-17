import { SquareArrowOutUpRight } from "lucide-react";
import type { Clima } from "../types/apiTypes";
import { useTranslation } from "react-i18next";

interface Props {
  clima: Clima;
  showExpand?: boolean;
  onExpand?: () => void;
}

export default function CardClima({ clima, showExpand, onExpand }: Props) {
  const {} = useTranslation();
  return (
      <div className="bg-linear-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-4 border border-emerald-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-103 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-100">
        {showExpand && (
          <SquareArrowOutUpRight
            className="absolute top-4 right-4 rounded-lg cursor-pointer hover:scale-110 transition-all w-5 h-5 text-gray-800 dark:text-slate-200"
            onClick={onExpand}
          />
        )}
        <div className="text-center mb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">
            Temperatura
          </h2>
        </div>

        {/* Ícone e temp */}
        <div className="flex items-center justify-center mb-3">
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
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Sensação</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {Math.round(clima.sensacao)}°C
            </p>
          </div>
          <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Umidade</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {clima.umidade}%
            </p>
          </div>
          <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Vento</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {clima.vento_kph} km/h
            </p>
          </div>
          <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Período</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {clima.dia ? "☀️ Dia" : "🌙 Noite"}
            </p>
          </div>
        </div>

        {/* Última att */}
        <div className="text-center pt-2 border-t border-emerald-200 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            {clima.atualizado_em}
          </p>
        </div>
    </div>
  );
}
