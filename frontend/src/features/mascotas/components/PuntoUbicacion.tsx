import { useState } from 'react';
import TarjetaMascota from './TarjetaMascota';
import type { PuntoUbicacionProps } from '../../../shared/types/mascota';

const PuntoUbicacion = ({ top, left, mascota }: PuntoUbicacionProps) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="absolute"
            style={{ top, left, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Punto con imagen */}
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-primary overflow-hidden flex items-center justify-center">
                {mascota.imagenUrl ? (
                    <img src={mascota.imagenUrl} alt={mascota.nombre} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-white text-xs">🐾</span>
                )}
            </div>

            {/* Tarjeta al pasar el mouse */}
            {hover && (
                <div className="absolute z-50 -top-40 left-1/2 -translate-x-1/2">
                    <div className="w-64">
                        <TarjetaMascota mascota={mascota} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PuntoUbicacion;
