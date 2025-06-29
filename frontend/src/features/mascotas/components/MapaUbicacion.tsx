import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import { useAuth } from '../../auth/context/AuthProvider';
import { useEffect } from 'react';
import L from 'leaflet';

interface Mascota {
  mascotaId: number;
  nombre: string;
  duenoEmail: string;
  latitud: number;
  longitud: number;
  ubicacionTexto?: string;
  especieMascota?: string;
  sexoMascota?: string;
  edad?: number;
  vacunado?: boolean;
  esterilizado?: boolean;
  descripcion?: string;
  imagen?: string;
  contactoUrl?: string;
  estado?: string;
}

interface Props {
  mascotas: Mascota[];
}

const CentrarMapa = ({ coordenadas }: { coordenadas: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (coordenadas) {
      map.setView(coordenadas, 13);
    }
  }, [coordenadas, map]);

  return null;
};

const MapaUbicacion = ({ mascotas }: Props) => {
  const { user } = useAuth();
  const coordenadasValidas = mascotas.find(
    m => typeof m.latitud === 'number' && typeof m.longitud === 'number'
  );

  const centroFiltrado: LatLngExpression | null = coordenadasValidas
    ? [coordenadasValidas.latitud, coordenadasValidas.longitud]
    : null;

  const centroInicial: LatLngExpression = [-34.65885, -58.47482];

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={centroInicial}
      zoom={13}
      scrollWheelZoom
      className="w-full h-[80vh] rounded"
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {centroFiltrado && <CentrarMapa coordenadas={centroFiltrado} />}
      {mascotas
        .filter(m => typeof m.latitud === 'number' && typeof m.longitud === 'number')
        .map(m => (
          <CustomMarker
            key={m.mascotaId}
            mascota={m}
            user={user}
          />
        ))}
    </MapContainer>
  );
};

export default MapaUbicacion;