import { useEffect, useState, type JSX } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  cidade: string;
}

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 8, { animate: true });
  }, [lat, lon, map]);

  return null;
}

export default function MapaClimaInterativo({ cidade }: Props): JSX.Element {
  const [coordenadas, setCoordenadas] = useState({ lat: -15.78, lon: -47.93 });

  useEffect(() => {
    async function buscarCoordenadas() {
      if (!cidade.trim()) return;
      try {
        const response = await fetch(`http://localhost:3000/api/geocode?cidade=${cidade}`);
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


  return (
    <div className="bg-linear-to-br from-white to-emerald-50 rounded-2xl p-3 border border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-103 hover:-translate-y-1 duration-300 animate-fade-in">
      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Mapa Interativo</h3>
      
      <div className="w-full h-[260px] rounded-2xl overflow-hidden border border-emerald-200 shadow-sm">
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
          style={{ height: "100%", width: "100%" }}
        >

          <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          <RecenterMap lat={coordenadas.lat} lon={coordenadas.lon} />

          <CircleMarker
            center={[coordenadas.lat, coordenadas.lon]}
            radius={8}
            pathOptions={{
              color: "#0d5fd1",
              fillColor: "#0d5fd1",
              fillOpacity: 0.5,
            }}
          >
          </CircleMarker>
        </MapContainer>
      </div>
    </div>
  );
}
