import { useEffect, useState } from "react";

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



  
  const buscarClima = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/clima?cidade=${cidade}`);
      const data: Clima = await res.json();
      setClima(data);
    } catch (err) {
      console.error("Erro ao buscar clima:", err);
      setClima(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <h1 className="text-3xl text-black font-bold mb-6">🌤 Clima App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Digite a cidade"
          className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={buscarClima}
          className="bg-blue-500 text-black
           px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {clima && (
        <div className="bg-white text-black p-6 rounded shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">{clima.cidade}, {clima.pais}</h2>
          <img src={clima.icone} alt={clima.condicao} className="mx-auto mb-2"/>
          <p className="text-lg font-medium mb-1">{clima.condicao}</p>
          <p className="mb-1">🌡 Temperatura: {clima.temperatura}°C</p>
          <p className="mb-1">🤗 Sensação: {clima.sensacao}°C</p>
          <p className="mb-1">💧 Umidade: {clima.umidade}%</p>
          <p className="mb-1">💨 Vento: {clima.vento_kph} km/h</p>
          <p>{clima.dia ? "☀️ Dia" : "🌙 Noite"}</p>
          <p className="mt-2 text-sm text-gray-500">Atualizado em: {clima.atualizado_em}</p>
        </div>
      )}
    </div>
  );
}

export default App;
