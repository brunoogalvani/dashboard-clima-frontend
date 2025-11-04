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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-sky-200 to-teal-200 animate-gradient-shift p-4">
    <div className="w-[1600px] min-h-[1000px] h-auto min-w-[600px] max-w-[3000px]">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-cyan-600
p-2 text-center rounded-t-3xl shadow-md animate-slide-down">
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
                onClick={buscarClima}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      
      {/* Card de Clima */}
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-100 animate-border-glow">
        {/* Localização */}
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold text-gray-800">
            {clima.cidade}
          </h2>
          <p className="text-gray-500 text-xs">{clima.pais}</p>
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
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Sensação</p>
            <p className="text-sm font-semibold text-gray-800">
              {Math.round(clima.sensacao)}°C
            </p>
          </div>
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Umidade</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.umidade}%
            </p>
          </div>
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Vento</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.vento_kph} km/h
            </p>
          </div>
          <div className="bg-white/70 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs mb-1">Período</p>
            <p className="text-sm font-semibold text-gray-800">
              {clima.dia ? "☀️ Dia" : "🌙 Noite"}
            </p>
          </div>
        </div>

        {/* Última att */}
        <div className="text-center pt-2 border-t border-emerald-200">
          <p className="text-xs text-gray-500">
            {clima.atualizado_em}
          </p>
        </div>
      </div>

      {/* Card 2 - Placeholder  */}
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-fade-in animation-delay-200 animate-border-glow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">text2</h3>
        <p className="text-gray-600 text-sm">Dados em breve.</p>
      </div>

      {/* Card 3 - Placeholder */}
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 duration-300 animate-fade-in animation-delay-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2">text3</h3>
        <p className="text-gray-600 text-sm">Dados em breve</p>
      </div>

      {/* Card 4 - Placeholder */}
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg transition-all  hover:scale-105 hover:-translate-y-1 duration-300 animate-fade-in animation-delay-300">
        <h3 className="text-lg font-bold text-gray-800 mb-2">text4</h3>
        <p className="text-gray-600 text-sm">Dados em breve</p>
      </div>

      {/* Card 5 - Placeholder */}
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 duration-300 animate-fade-in
      animation-delay-300">
        <h3 className="text-lg font-bold text-gray-800 mb-2">text5</h3>
        <p className="text-gray-600 text-sm">Dados em breve</p>
      </div>

    {/* Card 6 - Placeholder */}
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 duration-300 animate-fade-in
      animation-delay-400">
        <h3 className="text-lg font-bold text-gray-800 mb-2">text6</h3>
        <p className="text-gray-600 text-sm">Dados em breve</p>
      </div>

      
      


    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default App;