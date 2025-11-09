import { useEffect, useState, type JSX } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapaClimaInterativoProps {
  cidade: string;
}

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 8, { animate: true }); // centraliza com zoom 6
  }, [lat, lon, map]);

  return null;
}

export default function MapaClimaInterativo({ cidade }: MapaClimaInterativoProps): JSX.Element {
  const [coordenadas, setCoordenadas] = useState({ lat: -15.78, lon: -47.93 });

  // Buscar coordenadas da cidade pesquisada
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
        {/* Mapa limpo e suave */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://carto.com/'>Carto</a>"
        />

        {/* Centraliza o mapa quando muda de cidade */}
        <RecenterMap lat={coordenadas.lat} lon={coordenadas.lon} />

        {/* Marcador discreto da cidade */}
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
  );
}
