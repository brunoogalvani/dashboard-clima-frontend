import { useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";

interface Props {
  onClick: (lat: number, lon: number) => void;
}

export function MapaClickHandler({ onClick }: Props) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      console.log("🎯 Click detectado no mapa:", event.latlng);
      const { lat, lng } = event.latlng;
      onClick(lat, lng);
    },
  });

  return null;
}