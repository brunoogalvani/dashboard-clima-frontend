import { SquareArrowOutUpRight } from "lucide-react";
import type { QualidadeAr } from "../types/apiTypes";
import RangeSegmentado from "./RangeSegmentado";

interface Props {
  qualidade: QualidadeAr | null;
  showExpand?: boolean;
  onExpand?: () => void;
}

export default function CardQualidadeExpandida({ qualidade, showExpand, onExpand }: Props) {
  const corAqi = (aqi: number) => {
    if (aqi <= 50) return "text-green-600";
    if (aqi <= 100) return "text-yellow-400";
    if (aqi <= 150) return "text-orange-400";
    if (aqi <= 200) return "text-rose-400";
    if (aqi <= 300) return "text-purple-600";
    return "text-red-700";
  };

  const getPoluenteName = (tipo: string) => {
    if (tipo === 'pm25') {
      return 'PM2.5'
    } else {
      return tipo.toUpperCase();
    }
  }

  return (
    <div className="bg-linear-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-103 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-100">
      {showExpand && (
        <SquareArrowOutUpRight
          className="absolute top-4 right-4 rounded-lg cursor-pointer hover:scale-110 transition-all w-5 h-5 text-gray-800"
          onClick={onExpand}
        />
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
        Qualidade do Ar
      </h3>

      {!qualidade ? (
        <p className="text-gray-600 text-sm text-center">
          Busque uma cidade para ver os dados.
        </p>
      ) : (
        <div className="text-center space-y-2">

          <p className={`text-4xl font-bold ${corAqi(qualidade.aqi)}`}>
            {qualidade.aqi}
          </p>

          <RangeSegmentado value={qualidade.aqi}/>

          <div className="grid grid-cols-2 gap-2 mt-5 mb-3">
            <div className="bg-white/70 rounded-lg p-2">
              <p className="text-gray-500 text-xs mb-1">Poluente Dominante</p>
              <p className="font-semibold text-gray-800 uppercase">
                {qualidade.dominancia || "-"}
              </p>
            </div>
            {qualidade.poluentes != null ? (
              qualidade.poluentes.map((poluente) => (
                <div key={poluente.tipo} className="bg-white/70 rounded-lg p-2">
                  <p className="text-gray-500 text-xs mb-1">{getPoluenteName(poluente.tipo)}</p>
                  <p className="font-semibold text-gray-800">
                    {poluente.valor ? `${poluente.valor} µg/m³` : '-'}
                  </p>
                </div>
              ))
            ) : null}
          </div>

          <div className="text-center pt-2 border-t border-emerald-200">
            <p className="text-xs text-gray-500">
              {qualidade.hora_atualizada}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
