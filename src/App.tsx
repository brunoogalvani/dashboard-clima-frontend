import { useState } from "react";
import { buscarClima, type Clima } from "./services/climaService";
import { buscarQualidadeAr, type QualidadeAr } from "./services/qualidadeService";
import MapaClimaInterativo from "./components/MapaClimaInterativo";
import CardQualidade from "./components/cardQualidade";
import CardClima from "./components/cardClima";
import { CardIncendios } from "./components/CardIncendios";


function App() {
  const [cidade, setCidade] = useState("São Paulo");
  const [cidadeBuscada, setCidadeBuscada] = useState("São Paulo");
  const [clima, setClima] = useState<Clima | null>(null);
  const [qualidade, setQualidade] = useState<QualidadeAr | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  const buscarDados = async () => {
    if (!cidade.trim()) return;
    setLoading(true);
    setErro(false);
    try {
      const [dadosClima, dadosQualidade] = await Promise.all([
        buscarClima(cidade),
        buscarQualidadeAr(cidade),
      ]);
      setClima(dadosClima);
      setQualidade(dadosQualidade);
      setCidadeBuscada(cidade);
    } catch (e) {
      setErro(true);
      setClima(null);
      setQualidade(null);
    } finally {
      setLoading(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') buscarDados();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-sky-200 to-teal-200 animate-gradient-shift">
      <div className="w-[1600px] h-auto min-w-[600px] max-w-[3000px] content-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-cyan-600 p-2 text-center rounded-t-3xl shadow-md animate-slide-down">
            <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-sm">PIMA</h1>
            <p className="text-emerald-50 text-sm italic">Consulte dados ambientais com precisão </p>
          </div>

          {/* pesquisa */}
          <div className="p-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite a cidade"
                className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={loading}
              />
              <button
                onClick={buscarDados}
                disabled={loading || !cidade.trim()}
                className="bg-gradient-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                {loading ? "..." : "Buscar"}
              </button>
            </div>

            {/* Mensagem de Erro */}
            {erro && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">
                  Não foi possível encontrar a cidade. Tente novamente.
                </p>
              </div>
            )}
          </div>

          {/* Display - Grid Layout */}
          {clima && !loading && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-fr">
                
                {/* Card de Clima */}
                <CardClima clima={clima} />

                {/* Card 2 - Qualidade do Ar */}
                {qualidade && <CardQualidade qualidade={qualidade} />}

                {/* Card 3 - Mapa Interativo */}
                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-3 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 duration-300 animate-fade-in animation-delay-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Mapa Interativo</h3>
                  <MapaClimaInterativo cidade={cidadeBuscada} />
                </div>

                {/* Card 4 - Placeholder */}
                <CardIncendios cidade={cidadeBuscada} />

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;