import { useState } from "react";

interface Clima {
  cidade: string;
  pais: string;
  temperatura: number;
  dia: boolean;
  sensacao: number;
  condicao: string;
  umidade: number;
  vento_kph: number;
  icone: string;
  atualizado_em: string;
}

function App() {
  const [cidade, setCidade] = useState("Sao_Paulo");
  const [clima, setClima] = useState<Clima | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  const buscarClima = async () => {
    if (!cidade.trim()) return;
    
    setLoading(true);
    setErro(false);
    try {
      const res = await fetch(`http://localhost:3000/api/clima?cidade=${cidade}`);
      if (!res.ok) throw new Error('Cidade não encontrada');
      const data: Clima = await res.json();
      setClima(data);
    } catch (err) {
      console.error("Erro ao buscar clima:", err);
      setClima(null);
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') buscarClima();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">🌤️ Clima App</h1>
            <p className="text-blue-100 text-sm">Consulte o clima em tempo real</p>
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
                onClick={buscarClima}
                disabled={loading || !cidade.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? "..." : "Buscar"}
              </button>
            </div>

            {/* Mensagem de Erro */}
            {erro && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">
                  ❌ Não foi possível encontrar a cidade. Tente novamente.
                </p>
              </div>
            )}
          </div>

          {/* Display */}
          {clima && !loading && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                {/* Localizacao */}
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {clima.cidade}
                  </h2>
                  <p className="text-gray-500 text-sm">{clima.pais}</p>
                </div>

                {/* Icones e temp */}
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src={clima.icone} 
                    alt={clima.condicao} 
                    className="w-24 h-24"
                  />
                  <div className="ml-4">
                    <p className="text-5xl font-bold text-gray-800">
                      {Math.round(clima.temperatura)}°
                    </p>
                    <p className="text-gray-600 font-medium mt-1">
                      {clima.condicao}
                    </p>
                  </div>
                </div>

                {/* detalhes */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-gray-500 text-xs mb-1">Sensação</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {Math.round(clima.sensacao)}°C
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-gray-500 text-xs mb-1">Umidade</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {clima.umidade}%
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-gray-500 text-xs mb-1">Vento</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {clima.vento_kph} km/h
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-gray-500 text-xs mb-1">Período</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {clima.dia ? "☀️ Dia" : "🌙 Noite"}
                    </p>
                  </div>
                </div>

                {/* ultima att */}
                <div className="text-center pt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-500">
                    Atualizado em: {clima.atualizado_em}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* carregando */}
          {loading && (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
                <p className="text-gray-600">Carregando dados do clima...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;