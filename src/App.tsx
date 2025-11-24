import { useState } from "react";
import type { Clima, Previsao, QualidadeAr, Incendios } from "./types/apiTypes";
import CardClima from "./components/CardClima";
import CardQualidade from "./components/CardQualidade";
import CardIncendios from "./components/CardIncendios";
import CardMapaIncendios from "./components/CardMapaIncendios";
import MapaClimaInterativo from "./components/MapaClimaInterativo";
import CardPrevisao from "./components/CardPrevisao";
import Sidebar from "./components/Sidebar";
import Horario from "./components/Horario";
import InputAutocompleteCidade from "./components/AutoCompleteCidade";
import { buscarDadosGerais } from "./services/dadosService";

function App() {
  const [cidade, setCidade] = useState("");
  const [cidadeBuscada, setCidadeBuscada] = useState("");
  const [clima, setClima] = useState<Clima | null>(null);
  const [qualidade, setQualidade] = useState<QualidadeAr | null>(null);
  const [incendios, setIncendios] = useState<Incendios | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [previsao, setPrevisao] = useState<Previsao | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const buscarDados = async (nomeCidade?: string) => {
    const cidadeParaBuscar = nomeCidade?.trim() || cidade.trim();
    if (!cidade.trim()) return;
    setLoading(true);
    setErro(false);
    setClima(null);
    setQualidade(null);
    setIncendios(null);
    setPrevisao(null);

    try {
      const dados = await buscarDadosGerais(cidadeParaBuscar);

      if ("erro" in dados.clima) {
        setClima(null);
      } else {
        setClima(dados.clima);
      }

      if ("erro" in dados.qualidade) {
        setQualidade(null);
      } else {
        setQualidade(dados.qualidade);
      }

      if ("erro" in dados.previsao) {
        setPrevisao(null);
      } else {
        setPrevisao(dados.previsao);
      }

      setIncendios(dados.incendios || null)
      setCidadeBuscada(cidadeParaBuscar)

    } catch (e) {
      console.error(e);
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
  if (loading) {
    return <p className="text-gray-700 text-center mt-6">Carregando dados...</p>;
  }

  const fallbackCard = (titulo: string, mensagem: string) => (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center text-gray-700 animate-fade-in-scale hover:scale-103 hover:-translate-y-1 hover:shadow-emerald-500/20 transition-all duration-500 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{titulo}</h3>
      <p className="text-sm">{mensagem}</p>
    </div>
  );

  switch (selected) {
    case "Dashboard":
      if (!cidadeBuscada) {
        return (
          <p className="text-gray-600 text-center mt-6">
            Digite uma cidade para visualizar os dados ambientais.
          </p>
        );
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3.5 auto-rows-auto transition-all duration-500 animate-fade-in-scale">

          {/* Clima */}
          {clima ? (
            <CardClima clima={clima} showExpand={selected === "Dashboard"} onExpand={() => setSelected("Clima")} />
          ) : (
            fallbackCard("Clima", "Não foi possível obter os dados climáticos.")
          )}

          {/* Qualidade do ar */}
          {qualidade ? (
            <CardQualidade qualidade={qualidade} showExpand={selected === "Dashboard"} onExpand={() => setSelected("Qualidade do Ar")} />
          ) : (
            fallbackCard("Qualidade do Ar", "Não foi possível coletar dados de qualidade do ar.")
          )}

          {/* Mapa Interativo*/}
          {clima || qualidade || incendios ? (
            <MapaClimaInterativo cidade={cidadeBuscada} showExpand={selected === "Dashboard"} onExpand={() => setSelected("Mapa")} />
          ) : (
            fallbackCard("Mapa Interativo", "Dados insuficientes para exibir o mapa.")
          )}

          {/* Incêndios */}
          {incendios ? (
            <CardIncendios incendios={incendios} showExpand={selected === "Dashboard"} onExpand={() => setSelected("Incêndios")} />
          ) : (
            fallbackCard("Incêndios", "Não foi possível obter informações de incêndios.")
          )}
        </div>
      );

    case "Clima":
      return cidadeBuscada ? (
        <CardPrevisao cidade={cidadeBuscada} previsao={previsao} clima={clima} />
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
        <>
        <div className="flex flex-col gap-3.5">
          <CardIncendios incendios={incendios} />
          <CardMapaIncendios cidade={cidadeBuscada} />
        </div>
        </>
      ) : (
        fallbackCard("Incêndios", "Não foi possível obter informações de incêndios.")
      );

    case "Mapa":
      return (
        <>
          {clima || qualidade || incendios ? (
            <MapaClimaInterativo cidade={cidadeBuscada} />
          ) : (
            fallbackCard("Mapa", "Não foi possível exibir o mapa.")
          )}
        </>
      );

    default:
      return null;
  }
};

  return (
    <div
      className="flex min-h-screen bg-linear-to-br from-emerald-300 via-sky-300 to-teal-400 transition-all duration-700 ease-in-out overflow-hidden"
      style={{backgroundImage: 
        `radial-gradient(at top left, rgba(255, 255, 255, 0.08), transparent 70%), linear-gradient(to bottom right, #065f46, #0e7490, #115e59)`,
      }}
    >

      {/* Sidebar */}
      <Sidebar onSelect={setSelected} onToggle={setSidebarOpen} active={selected} />

      {/* Conteúdo principal */}
          <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 flex justify-center items-center p-3 md:p-6 overflow-y-auto transition-all duration-700 ease-in-out`}>
            <div
              className="w-full max-w-6xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] border border-white/20 hover:scale-[1.01] hover:shadow-emerald-500/20 transition-all duration-700 ease-in-out flex flex-col"
            >

            {/* Header */}
            <div className="bg-linear-to-r from-green-600 to-cyan-600 p-2 text-center rounded-t-3xl shadow-md animate-slide-down">
              <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-sm">PIMA</h1>
              <p className="text-emerald-50 text-sm italic">Plataforma Integrada de Monitoramento Ambiental</p>
            </div>

            {/* Pesquisa */}
            <div className="p-3">
              <div className="flex gap-2">
                  <InputAutocompleteCidade
                    value={cidade}
                    setValue={setCidade}
                    onSelect={(novaCidade) => {
                      setCidade(novaCidade);
                      buscarDados(novaCidade);
                    }}
                    disabled={loading}
                  />
                <button
                  onClick={() => buscarDados(cidade)}
                  disabled={loading || !cidade.trim()}
                  className="bg-linear-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
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

              {(clima && qualidade && incendios) && (
                <div className="mt-3 text-center animate-fade-in">
                  <p className="text-gray-700 text-sm">
                    <strong>{clima.cidade}</strong> ({clima.pais}) —{" "}
                    <span className="font-semibold"><Horario fuso={clima.fuso_horario}/></span>
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
