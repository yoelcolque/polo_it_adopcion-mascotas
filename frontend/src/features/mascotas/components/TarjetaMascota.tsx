import { useState } from 'react';
import { Link } from 'react-router-dom';

const TarjetaMascota = ({ mascota }: { mascota: any }) => {
    const [deseado, setDeseado] = useState(true);

    return (
        <div className="grid grid-cols-[100px_1fr_1fr] grid-rows-[auto_auto_auto_auto_auto] gap-2 bg-surface p-4 rounded-xl shadow-md">

            {/* Imagen */}
            <div className="row-span-2 col-span-1 flex justify-center items-center">
                <img
                    src={mascota.imagenUrl || '/placeholder.png'}
                    alt={mascota.nombre}
                    className="w-20 h-20 object-cover rounded-full border"
                />
            </div>

            {/* Datos */}
            <div className="col-span-2">
                <h3 className="text-xl font-heading text-text">{mascota.nombre}</h3>
                <p className="text-sm text-muted">{mascota.especie}</p>
                <p className="text-sm text-muted">Edad: {mascota.edad}</p>
            </div>

            {/* Descripción */}
            <div className="col-span-3 text-sm text-text row-span-2">
                {mascota.descripcion}
            </div>

            {/* Botones */}
            <div className="col-span-1">
                <button
                    onClick={() => setDeseado(!deseado)}
                    className={`w-full px-3 py-2 rounded-md text-white text-sm font-semibold ${
                        deseado ? 'bg-error' : 'bg-muted'
                    }`}
                >
                    {deseado ? 'Quitar deseo' : 'Marcar como deseado'}
                </button>
            </div>

            <div className="col-span-2 flex justify-end items-center">
                <Link
                    to={mascota.contactoUrl}
                    className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-md text-sm"
                >
                    Contactar
                </Link>
            </div>
        </div>
    );
};

export default TarjetaMascota;
