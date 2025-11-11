import { useState } from "react";
import { buscarClima, type Clima } from "./services/climaService";
import { buscarQualidadeAr, type QualidadeAr } from "./services/qualidadeService";
import { buscarIncendios, type Incendios } from "./services/incendiosService";
import MapaClimaInterativo from "./components/MapaClimaInterativo";
import CardQualidade from "./components/CardQualidade";
import CardClima from "./components/CardClima";
import CardIncendios from "./components/CardIncendios";
import Sidebar from "./components/Sidebar";
import CardMapaIncendios from "./components/CardMapaIncendios";

function App() {
  const [cidade, setCidade] = useState("São Paulo");
  const [cidadeBuscada, setCidadeBuscada] = useState("São Paulo");
  const [clima, setClima] = useState<Clima | null>(null);
  const [qualidade, setQualidade] = useState<QualidadeAr | null>(null);
  const [incendios, setIncendios] = useState<Incendios | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const buscarDados = async () => {
    if (!cidade.trim()) return;
    setLoading(true);
    setErro(false);

    setClima(null);
    setQualidade(null);
    setIncendios(null);

    try {
      const resultados = await Promise.allSettled([
        buscarClima(cidade),
        buscarQualidadeAr(cidade),
        buscarIncendios(cidade),
      ]);

      if (resultados[0].status === "fulfilled") setClima(resultados[0].value);
      if (resultados[1].status === "fulfilled") setQualidade(resultados[1].value);
      if (resultados[2].status === "fulfilled") setIncendios(resultados[2].value);

      setCidadeBuscada(cidade);
      const falhas = resultados.filter((r) => r.status === "rejected").length;
      if (falhas >= 2) setErro(true);
    } catch (e) {
      console.error(e);
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") buscarDados();
  };

  const renderContent = () => {
  if (loading) {
    return <p className="text-gray-700 text-center mt-6">Carregando dados...</p>;
  }

  // Função auxiliar para fallback visual
  const fallbackCard = (titulo: string, mensagem: string) => (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center text-gray-700 animate-fade-in-scale hover:scale-[1.01] hover:brightness-110 hover:shadow-emerald-500/20 transition-all duration-500 ease-in-out">

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{titulo}</h3>
      <p className="text-sm">{mensagem}</p>
    </div>
  );

  switch (selected) {
    case "Dashboard":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-fr transition-all duration-500 animate-fade-in-scale">

          {/* Clima */}
          {clima ? (
            <CardClima clima={clima} />
          ) : (
            fallbackCard("Clima", "Não foi possível obter os dados climáticos.")
          )}

          {/* Qualidade do ar */}
          {qualidade ? (
            <CardQualidade qualidade={qualidade} />
          ) : (
            fallbackCard("Qualidade do Ar", "Não foi possível coletar dados de qualidade do ar.")
          )}

          {/* Mapa */}
          <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-3 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 duration-300 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Mapa Interativo</h3>
            {clima || qualidade || incendios ? (
              <MapaClimaInterativo cidade={cidadeBuscada} />
            ) : (
              <p className="text-gray-600 text-sm text-center p-4">
                Dados insuficientes para exibir o mapa.
              </p>
            )}

            </div>
            {/* 🌎 Novo Card - Mapa de Incêndios */}
        <CardMapaIncendios cidade={cidadeBuscada} />

        
  
          {/* Incêndios */}
          {incendios ? (
            <CardIncendios incendios={incendios} />
          ) : (
            fallbackCard("Incêndios", "Não foi possível obter informações de incêndios.")
          )}
        </div>
      );

      

    case "Clima":
      return clima ? (
        <CardClima clima={clima} />
      ) : (
        fallbackCard("Clima", "Não foi possível obter os dados climáticos.")
      );

    case "Qualidade do Ar":
      return qualidade ? (
        <CardQualidade qualidade={qualidade} />
      ) : (
        fallbackCard("Qualidade do Ar", "Não foi possível coletar dados de qualidade do ar.")
      );

    case "Incêndios":
      return incendios ? (
        <CardIncendios incendios={incendios} />
      ) : (
        fallbackCard("Incêndios", "Não foi possível obter informações de incêndios.")
      );

    case "Mapa":
      return (
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-3 border border-emerald-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Mapa Interativo</h3>
          {clima || qualidade || incendios ? (
            <MapaClimaInterativo cidade={cidadeBuscada} />
          ) : (
            <p className="text-gray-600 text-sm text-center p-4">
              Dados insuficientes para exibir o mapa.
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
};

  return (
    <div
        className="flex min-h-screen bg-gradient-to-br from-emerald-300 via-sky-300 to-teal-400 transition-all duration-700 ease-in-out overflow-hidden"
     style={{
  backgroundImage: `
    radial-gradient(at top left, rgba(255, 255, 255, 0.08), transparent 70%),
    linear-gradient(to bottom right, #065f46, #0e7490, #115e59)
  `,
}}

>

      {/* Sidebar */}
      <Sidebar onSelect={setSelected} />

      {/* Conteúdo principal */}
          <div className="flex-1 flex justify-center items-center p-3 md:p-6 overflow-y-auto transition-all duration-700 ease-in-out">
            <div
              className="w-full max-w-6xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] 
              border border-white/20 hover:scale-[1.01] hover:brightness-110 hover:shadow-emerald-500/20
              transition-all duration-700 ease-in-out flex flex-col"
            >



            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-cyan-600 p-2 text-center rounded-t-3xl shadow-md animate-slide-down">
              <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-sm">PIMA</h1>
              <p className="text-emerald-50 text-sm italic">Plataforma Integrada de Monitoramento Ambiental</p>
            </div>

            {/* Pesquisa */}
            <div className="p-3">
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

              {erro && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm text-center">
                    Não foi possível encontrar a cidade. Tente novamente.
                  </p>
                </div>
              )}

              {clima && (
                <div className="mt-3 text-center animate-fade-in">
                  <p className="text-gray-700 text-sm">
                    <strong>{clima.cidade}</strong> ({clima.pais}) —{" "}
                    <span className="font-semibold">{clima.horario_local}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 pb-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default App;
