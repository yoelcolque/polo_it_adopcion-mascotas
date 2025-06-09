import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import { useAuth } from '../../auth/context/AuthProvider';
import { useEffect } from 'react';

type Mascota = {
    mascotaId: number;
    nombre: string;
    latitud: number;
    longitud: number;
    ubicacionTexto: string;
};

type Props = {
    mascotas: Mascota[];
};

const CentrarMapa = ({ coordenadas }: { coordenadas: [number, number] }) => {
    const map = useMap();

    useEffect(() => {
        if (coordenadas) {
            map.setView(coordenadas, 13); // Puedes ajustar el zoom aquí si querés
        }
    }, [coordenadas, map]);

    return null;
};

const MapaUbicacion = ({ mascotas }: Props) => {
    const { user } = useAuth();
    const coordenadasValidas = mascotas.find(
        m => typeof m.latitud === 'number' && typeof m.longitud === 'number'
    );

    const centroFiltrado: [number, number] | null = coordenadasValidas
        ? [coordenadasValidas.latitud, coordenadasValidas.longitud]
        : null;

    const centroInicial: [number, number] = [-34.65885, -58.47482]; // por defecto

    return (
        <MapContainer
            center={centroInicial}
            zoom={13}
            scrollWheelZoom
            className="w-[320px] h-[320px] rounded"
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
                        usuarioActualId={user?.usuarioId || 0}
                    />
                ))}
        </MapContainer>
    );
};

export default MapaUbicacion;
