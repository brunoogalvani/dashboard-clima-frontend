import { useEffect, useState, type JSX } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SquareArrowOutUpRight } from "lucide-react";
import { MapaClickHandler } from "./MapaClickHandler";
import { buscarDadosPorCoordenadas } from "../services/dadosService";
import { BASE_API_URL } from "../config/apiConfig";

interface Props {
  cidade: string;
  showExpand?: boolean;
  onExpand?: () => void;
  onDadosAtualizados?: (dados: any) => void;
}

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 8, { animate: true });
  }, [lat, lon, map]);

  return null;
}

export default function MapaClimaInterativo({ 
  cidade, 
  showExpand, 
  onExpand, 
  onDadosAtualizados 
}: Props): JSX.Element {
  const [coordenadas, setCoordenadas] = useState({ lat: -15.78, lon: -47.93 });
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    async function buscarCoordenadas() {
      if (!cidade.trim()) return;
      try {
        const response = await fetch(`${BASE_API_URL}/api/geocode?cidade=${cidade}`);
        const data = await response.json();
        if (data && data.lat && data.lon) {
          setCoordenadas({ lat: data.lat, lon: data.lon });
        }
      } catch (err) {
        console.error("Erro ao buscar coordenadas:", err);
      }
    }

    buscarCoordenadas();
  }, [cidade]);

  async function handleMapClick(lat: number, lon: number) {
    console.log("🗺️ handleMapClick chamado!", { lat, lon, onDadosAtualizados, buscando });
    
    if (!onDadosAtualizados) {
      console.warn("⚠️ onDadosAtualizados não está definido!");
      return;
    }
    
    if (buscando) {
      console.warn("⚠️ Já está buscando dados...");
      return;
    }
    
    setBuscando(true);
    
    try {
      console.log("✅ Buscando dados para:", lat, lon);

      const dados = await buscarDadosPorCoordenadas(lat, lon);
      console.log("✅ Dados recebidos:", dados);

      // Atualizar as coordenadas para mover o marcador
      setCoordenadas({ lat, lon });

      // Enviar os dados pro componente pai atualizar tudo
      onDadosAtualizados(dados);
      console.log("✅ Dados enviados para o componente pai!");

    } catch (err) {
      console.error("❌ Erro ao buscar dados por coordenadas:", err);
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div className="bg-linear-to-br from-white to-emerald-50 rounded-2xl p-3 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-103 hover:-translate-y-1 duration-300 animate-fade-in relative">
      {showExpand && (
        <SquareArrowOutUpRight
          className="absolute top-4 right-4 rounded-lg cursor-pointer hover:scale-110 transition-all w-5 h-5 text-gray-800 z-1000"
          onClick={onExpand}
        />
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
        Mapa Interativo
        {buscando && <span className="text-sm text-gray-500 ml-2">(buscando...)</span>}
      </h3>
      
      <div className="w-full h-[250px] rounded-2xl overflow-hidden border border-emerald-200 shadow-sm">
        <MapContainer
          center={[coordenadas.lat, coordenadas.lon]}
          zoom={5}
          minZoom={3}
          maxZoom={10}
          zoomControl={false}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          dragging={true}
          attributionControl={false}
          style={{ height: "100%", width: "100%", cursor: buscando ? "wait" : "pointer" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          <RecenterMap lat={coordenadas.lat} lon={coordenadas.lon} />

          <CircleMarker
            center={[coordenadas.lat, coordenadas.lon]}
            radius={8}
            pathOptions={{
              color: "#0d5fd1",
              fillColor: "#0d5fd1",
              fillOpacity: 0.8,
            }}
          />

          <MapaClickHandler onClick={handleMapClick} />
        </MapContainer>
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-2">
        Clique no mapa para buscar dados de outra localização
      </p>
    </div>
  );
}