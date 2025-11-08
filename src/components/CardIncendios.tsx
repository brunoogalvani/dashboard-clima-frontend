import React, { useEffect, useState } from "react";
import { getIncendios } from "../services/incendiosService";

interface CardIncendiosProps {
  cidade: string;
}

export const CardIncendios: React.FC<CardIncendiosProps> = ({ cidade }) => {
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!cidade) return;
    const buscarDados = async () => {
      setLoading(true);
      setErro(null);
      try {
        const data = await getIncendios(cidade);
        setDados(data);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, [cidade]);

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-103 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-100">
      {/* Título */}
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center gap-2">
          🔥 Risco de Incêndio
        </h2>
        <p className="text-gray-500 text-xs">{cidade}</p>
      </div>

      {/* Estado de carregamento / erro */}
      {loading && <p className="text-gray-600 text-sm">Carregando...</p>}
      {erro && <p className="text-red-500 text-sm">{erro}</p>}

      {/* Dados */}
      {!loading && dados && (
        <>
          <div className="grid grid-cols-1 gap-2 mb-3">
            <div className="bg-white/70 rounded-lg p-2 text-center">
              <p className="text-gray-500 text-xs mb-1">Total de focos</p>
              <p className="text-sm font-semibold text-gray-800">
                {dados.total_incendios}
              </p>
            </div>

            {dados.total_incendios > 0 ? (
              <div className="bg-white/70 rounded-lg p-2 text-center">
                <p className="text-gray-500 text-xs mb-1">Últimos focos</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  {dados.incendios.slice(0, 3).map((foco: any, idx: number) => (
                    <li key={idx}>
                      📍 {foco.latitude}, {foco.longitude} — {foco.acq_date}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white/70 rounded-lg p-2 text-center">
                <p className="text-green-600 font-medium">
                  Sem incêndios recentes 🌿
                </p>
              </div>
            )}
          </div>

          {/* Fonte */}
          <div className="text-center pt-2 border-t border-emerald-200">
            <p className="text-xs text-gray-500">{dados.fonte}</p>
          </div>
        </>
      )}
    </div>
  );
};
