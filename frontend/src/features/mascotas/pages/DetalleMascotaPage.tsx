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

                {/* Descripción general */}
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

                    <div className="gap-6 flex flex-col justify-between items-start mb-2">
                        <h3 className="text-md font-semibold text-text">Acerca de mí</h3>
                        <p className="text-muted text-sm whitespace-pre-line">
                            {mascota.temperamento || 'Sin descripción específica'}
                        </p>
                    </div>
                </div>

                {/* Información adicional de salud */}
                <div className="p-4 border-t space-y-4">
                    <h3 className="text-md font-semibold text-text mb-2">Salud y cuidados</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text">
                        <div className="flex items-center justify-between border p-3 rounded bg-[#F5FAFA]">
                            <span className="font-medium">Esterilizado</span>
                            <span>{mascota.esterilizado ? 'Sí' : 'No'}</span>
                        </div>

                        <div className="flex items-center justify-between border p-3 rounded bg-[#F5FAFA]">
                            <span className="font-medium">Vacunado</span>
                            <span>{mascota.vacunado ? 'Sí' : 'No'}</span>
                        </div>

                        <div className="flex items-center justify-between border p-3 rounded bg-[#F5FAFA]">
                            <span className="font-medium">Peso</span>
                            <span>{mascota.peso ? `${mascota.peso} kg` : 'No especificado'}</span>
                        </div>

                        <div className="flex items-center justify-between border p-3 rounded bg-[#F5FAFA]">
                            <span className="font-medium">Pelaje</span>
                            <span>{mascota.pelaje || 'No especificado'}</span>
                        </div>
                    </div>

                    {mascota.historialMedico && (
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Historial médico</h4>
                            <p className="text-muted text-sm whitespace-pre-line bg-[#F5FAFA] p-3 rounded border">
                                {mascota.historialMedico}
                            </p>
                        </div>
                    )}

                    {mascota.necesidades && (
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Necesidades</h4>
                            <p className="text-muted text-sm whitespace-pre-line bg-[#F5FAFA] p-3 rounded border">
                                {mascota.necesidades}
                            </p>
                        </div>
                    )}
                </div>

                {/* Reseñas (mockeadas) */}
                {mascota.resenas && mascota.resenas.length > 0 && (
                    <div className="p-4 border-t">
                        <h3 className="text-md font-semibold text-text mb-3">
                            {mascota.resenas.length} Reseñas
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {mascota.resenas.map((resena: any, index: number) => (
                                <div key={index} className="bg-[#CDEDF2] rounded-md p-3 shadow-sm text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <img
                                            src={resena.autor?.foto || '/placeholder.png'}
                                            alt={resena.autor?.nombre}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <strong>{resena.autor?.nombre}</strong>
                                    </div>

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

                                    <p className="text-text text-sm mb-1 line-clamp-3">
                                        {resena.comentario}
                                    </p>

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
