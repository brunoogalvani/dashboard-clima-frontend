import { SquareArrowOutUpRight } from "lucide-react";
import type { Incendios } from "../types/apiTypes";

interface Props {
  incendios: Incendios;
  showExpand?: boolean;
  onExpand?: () => void;
}

export default function CardIncendios({ incendios, showExpand, onExpand }: Props) {
  return (
    <div className="min-h-[310px] bg-linear-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-4 border border-emerald-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-103 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-100 flex flex-col justify-between">

      {showExpand && (
        <SquareArrowOutUpRight
          className="absolute top-4 right-4 rounded-lg cursor-pointer hover:scale-110 transition-all w-5 h-5 text-gray-800 dark:text-slate-200"
          onClick={onExpand}
        />
      )}

      <div>
        {/* Título */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100 flex justify-center items-center gap-2">
            Risco de Incêndio
          </h2>
        </div>

        {/* Dados */}
        <div className="grid grid-cols-1 gap-2 mb-3">
          <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Total de focos</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {incendios.total_incendios}
            </p>
          </div>

          {incendios.total_incendios > 0 ? (
            <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
              <p className="text-gray-500 dark:text-slate-400 text-xs mb-1">Últimos focos</p>
              <ul className="text-xs text-gray-700 dark:text-slate-200 space-y-1">
                {incendios.incendios.slice(0, 5).map((foco, idx) => (
                  <li key={idx}>
                    📍 {foco.latitude}, {foco.longitude} — {foco.acq_date}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white/70 dark:bg-slate-700/70 rounded-lg p-2 text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">Sem incêndios recentes 🌿</p>
            </div>
          )}
        </div>
      </div>

      {/* Fonte */}
      <div className="text-center pt-2 border-t border-emerald-200 dark:border-slate-700">
        <p className="text-xs text-gray-500 dark:text-slate-400">
          Fonte: {incendios.fonte}
        </p>
      </div>
    </div>
  );
}
