import { useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { createPortal } from 'react-dom';
import TarjetaMascota from './TarjetaMascota';

const CustomMarker = ({ mascota, usuarioActualId }: any) => {
    const [hover, setHover] = useState(false);
    const map = useMap();

    if (!mascota || mascota.latitud == null || mascota.longitud == null) return null;

    const position = [mascota.latitud, mascota.longitud] as [number, number];
    const offsetY = window.innerWidth < 768 ? 60 : 0;
    const offsetX = window.innerWidth < 768 ? 0 : -100;

    const icon = L.divIcon({
        className: '',
        html: `
      <div class="w-10 h-10 rounded-full border-2 border-primary shadow-md bg-white overflow-hidden flex items-center justify-center">
        ${
            mascota.imagen
                ? `<img src="${mascota.imagen}" alt="${mascota.nombre}" class="w-full h-full object-cover rounded-full"/>`
                : `<span class="text-white text-xs">🐾</span>`
        }
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

    return (
        <>
            <Marker
                position={position}
                icon={icon}
                eventHandlers={{
                    mouseover: () => setHover(true),
                    mouseout: () => setHover(false),
                }}
            />
            {hover &&
                createPortal(
                    <div
                        className="absolute z-[999] pointer-events-none"
                        style={{
                            left: map.latLngToContainerPoint(position).x - offsetX,
                            top: map.latLngToContainerPoint(position).y - offsetY,
                        }}
                    >
                        <div className="w-64">
                            <TarjetaMascota mascota={mascota} usuarioActualId={usuarioActualId} />
                        </div>
                    </div>,
                    document.getElementById('map-tooltip-root')!
                )}

        </>
    );
};

export default CustomMarker;
