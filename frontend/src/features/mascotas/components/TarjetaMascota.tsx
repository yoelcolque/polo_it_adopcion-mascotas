import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthProvider';
import { useDeseos } from '../../../shared/context/DeseosContext';

const TarjetaMascota = ({ mascota }: { mascota: any }) => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const { isDeseado, toggleDeseado } = useDeseos();

    const handleToggle = () => {
        if (!accessToken) {
            alert("Debes iniciar sesión para marcar como deseado.");
            navigate('/login');
            return;
        }

        toggleDeseado(mascota.id);
    };

    const estaDeseada = isDeseado(mascota.id);

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
                {mascota.descripcion || 'Sin descripción disponible.'}
            </div>

            {/* Botón de deseo */}
            <div className="col-span-1">
                <button
                    onClick={handleToggle}
                    className={`w-full px-3 py-2 rounded-md text-white text-sm font-semibold ${
                        estaDeseada ? 'bg-error' : 'bg-muted'
                    }`}
                >
                    {estaDeseada ? 'Quitar deseo' : 'Marcar como deseado'}
                </button>
            </div>

            {/* Botón de contacto */}
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
