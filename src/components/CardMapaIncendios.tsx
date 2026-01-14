import { useEffect, useState, type JSX } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { BASE_API_URL } from "../config/apiConfig";

interface Props {
  cidade: string;
}

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 6, { animate: true });
  }, [lat, lon, map]);
  return null;
}

export default function MapaClimaInterativo({ cidade }: Props): JSX.Element {
  const [coordenadas, setCoordenadas] = useState({ lat: -15.78, lon: -47.93 });
  const [incendios, setIncendios] = useState<{ lat: number; lon: number; intensidade: number }[]>([]);

  useEffect(() => {
    async function buscarCoordenadas() {
      if (!cidade.trim()) return;
      try {
        const response = await fetch(`${BASE_API_URL}/api/geocode?cidade=${cidade}`);
        const data = await response.json();
        if (data?.lat && data?.lon) {
          setCoordenadas({ lat: data.lat, lon: data.lon });
        }
      } catch (err) {
        console.error("❌ Erro ao buscar coordenadas:", err);
      }
    }
    buscarCoordenadas();
  }, [cidade]);

  useEffect(() => {
  async function buscarIncendios() {
    try {
      const response = await fetch(`http://localhost:3000/api/incendios?cidade=${cidade}`);
      const data = await response.json();

      const lista = Array.isArray(data) ? data : data?.incendios;

      if (lista && Array.isArray(lista) && lista.length > 0) {
        const incendiosFormatados = lista.map((i: any) => ({
          lat: Number(i.latitude),
          lon: Number(i.longitude),
          intensidade: i.confidence ? i.confidence / 100 : 0.6,
        }));

        setIncendios(incendiosFormatados);
      } else {
        console.warn("⚠️ Nenhum dado válido recebido. Usando exemplo...");
        setIncendios([
          { lat: -15.78, lon: -47.93, intensidade: 0.5 },
          { lat: -23.55, lon: -46.63, intensidade: 0.7 },
        ]);
      }
    } catch (err) {
      console.error("Erro ao buscar incêndios:", err);
    }
  }

  buscarIncendios();
}, [cidade]);

  return (
    <div className="bg-linear-to-br from-white to-emerald-50 rounded-2xl p-3 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-103 hover:-translate-y-1 duration-300 animate-fade-in">
      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Focos de Incêndio</h3>

      <div className="w-full h-[260px] rounded-2xl overflow-hidden border border-emerald-200 shadow-sm">
        <MapContainer
          center={[coordenadas.lat, coordenadas.lon]}
          zoom={6}
          minZoom={3}
          maxZoom={10}
          zoomControl={false}
          scrollWheelZoom
          doubleClickZoom={false}
          dragging
          attributionControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
          />

          <RecenterMap lat={coordenadas.lat} lon={coordenadas.lon} />

          {incendios.length > 0 && (
            <HeatmapLayer incendios={incendios} />
          )}

          {incendios.map((inc, index) => (
            <CircleMarker
              key={index}
              center={[inc.lat, inc.lon]}
              radius={4}
              pathOptions={{
                color: "#ef4444",
                fillColor: "#f87171",
                fillOpacity: 0.7,
              }}
            >
              <Popup>
                <p><strong>🔥 Incêndio detectado</strong></p>
                <p>Intensidade: {(inc.intensidade * 100).toFixed(0)}%</p>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

/* Componente para criar a layer de calor */
function HeatmapLayer({ incendios }: { incendios: { lat: number; lon: number; intensidade: number }[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || incendios.length === 0) return;

    const heatPoints = incendios.map((i) => [i.lat, i.lon, i.intensidade] as [number, number, number]);

    const heat = (L as any).heatLayer(heatPoints, {
      radius: 20,
      blur: 25,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.4: "blue",
        0.6: "lime",
        0.8: "orange",
        1.0: "red",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, incendios]);

  return null;
}
