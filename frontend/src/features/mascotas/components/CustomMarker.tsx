import { Marker, Popup } from 'react-leaflet';
import { type LatLngExpression } from 'leaflet';
import L from 'leaflet';
import TarjetaMascota from './TarjetaMascota';
import { useDeseos } from '../../../shared/context/DeseosContext';

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

interface CustomMarkerProps {
  mascota: Mascota;
  user?: { email: string };
}

const CustomMarker = ({ mascota, user }: CustomMarkerProps) => {
  const { isDeseado, toggleDeseado } = useDeseos();

  if (!mascota || mascota.latitud == null || mascota.longitud == null) return null;

  const icon = L.divIcon({
    className: '',
    html: `
      <div class="w-14 h-14 rounded-full border-2 border-primary shadow-md bg-white overflow-hidden flex items-center justify-center">
        ${
          mascota.imagen
            ? `<img src="${mascota.imagen}" alt="${mascota.nombre}" class="w-full h-full object-cover rounded-full"/>`
            : `<span class="text-white text-sm">🐾</span>`
        }
      </div>
    `,
    iconSize: [56, 56], // Ajustado para w-14 h-14 (14 * 4 = 56px)
    iconAnchor: [28, 28], // Centro del marcador (56 / 2 = 28)
  });

  return (
    <Marker position={[mascota.latitud, mascota.longitud] as LatLngExpression} icon={icon}>
      <Popup
        autoClose={false}
        closeOnClick={false}
        closeOnEscapeKey={true}
        maxWidth={350}
        offset={[0, -28]} // Ajustado para marcador más grande
        className="custom-popup" // Clase para personalizar estilos
      >
        <TarjetaMascota
          mascota={mascota}
          user={user}
          isDeseado={isDeseado(mascota.mascotaId)}
          toggleDeseado={toggleDeseado}
        />
      </Popup>
    </Marker>
  );
};

export default CustomMarker;