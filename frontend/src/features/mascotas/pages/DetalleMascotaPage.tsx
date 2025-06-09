import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';
import { useDeseos } from '../../../shared/context/DeseosContext';
import { useAuth } from '../../auth/context/AuthProvider';

const DetalleMascotaPage = () => {
    const { id } = useParams();
    const [mascota, setMascota] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user, accessToken } = useAuth();
    const { isDeseado, toggleDeseado } = useDeseos();

    useEffect(() => {
        if (!id) return;

        axiosInstance.get(`/mascota/${id}`)
            .then(res => setMascota(res.data?.mascota))
            .catch(err => console.error('Error al obtener la mascota:', err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-4">Cargando...</p>;
    if (!mascota) return <p className="p-4 text-muted">Mascota no encontrada</p>;

    const estaDeseada = isDeseado(mascota.mascotaId);

    return (
        <div className="p-4 bg-background min-h-screen font-sans">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-4 p-4">
                    <img
                        src={mascota.imagen || '/placeholder.png'}
                        alt={mascota.nombre}
                        className="w-16 h-16 object-cover rounded-full"
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-text">{mascota.nombre}</h2>
                        <p className="text-muted">{mascota.ubicacionTexto}</p>
                    </div>
                </div>

                {/* Imagen */}
                <img
                    src={mascota.imagen || '/placeholder.png'}
                    alt={mascota.nombre}
                    className="w-full h-64 object-cover"
                />

                {/* Descripcion */}
                <div className="p-4">
                    <p className="text-sm text-text">{mascota.descripcion}</p>
                </div>

                {/* Acerca de mí */}
                <div className="p-4 border-t relative">
                    <button
                        onClick={() => toggleDeseado(mascota.mascotaId)}
                        className="absolute top-4 right-4"
                    >
                        <img
                            src="/Heart.svg"
                            alt="Deseado"
                            className={`w-6 h-6 ${estaDeseada ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                        />
                    </button>

                    {/* Contenido principal */}
                    <div className="gap-6 flex flex-col justify-between items-start mb-2">
                        <h3 className="text-md font-semibold text-text">Acerca de mí</h3>

                        <p className="text-muted text-sm whitespace-pre-line">
                            {mascota.temperamento || 'Sin descripción específica'}
                        </p>
                    </div>
                </div>
                {/* esto todavia no funciona pero hay una idea de como podria ser, ya que no se implemento sistema de comentarios ni reseñas */}
                {/* Reseñas */}
                {mascota.resenas && mascota.resenas.length > 0 && (
                    <div className="p-4 border-t">
                        <h3 className="text-md font-semibold text-text mb-3">
                            {mascota.resenas.length} Reseñas
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {mascota.resenas.map((resena: any, index: number) => (
                                <div key={index} className="bg-[#CDEDF2] rounded-md p-3 shadow-sm text-sm">
                                    {/* Nombre + Avatar */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <img
                                            src={resena.autor?.foto || '/placeholder.png'}
                                            alt={resena.autor?.nombre}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <strong>{resena.autor?.nombre}</strong>
                                    </div>

                                    {/* Estrellas (posdata solo es icon puesto, osea no es dinamico, aun no se implento sistema de reseñas) */}
                                    <div className="flex items-center gap-1 mb-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <img
                                                key={i}
                                                src={i < resena.puntaje ? '/StarFilled.svg' : '/StarEmpty.svg'}
                                                className="w-4 h-4"
                                                alt=""
                                            />
                                        ))}
                                    </div>

                                    {/* Texto */}
                                    <p className="text-text text-sm mb-1 line-clamp-3">
                                        {resena.comentario}
                                    </p>

                                    {/* Fsecha */}
                                    <p className="text-xs text-muted">
                                        {new Date(resena.fecha).toLocaleDateString('es-AR', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DetalleMascotaPage;
