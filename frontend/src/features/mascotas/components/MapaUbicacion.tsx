// MapaUbicacion.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapa } from '../../../shared/context/MapaContext';
import { useMascotas } from '../../../shared/context/MascotasContext';
import 'leaflet/dist/leaflet.css';

const MapaUbicacion = () => {
        const { coordenadas } = useMapa();
        const { mascotas } = useMascotas();

        return (
            <MapContainer
                center={[coordenadas.lat, coordenadas.lon]}
                zoom={13}
                scrollWheelZoom
                className="w-full h-[500px] rounded"
            >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mascotas.map((m: any) => (
                        <Marker key={m.mascotaId} position={[m.latitud, m.longitud]}>
                                <Popup>
                                        <strong>{m.nombre}</strong><br />
                                        {m.temperamento || 'Sin descripción'}
                                </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        );
};

export default MapaUbicacion;
