import { useEffect, useState } from 'react';
import TarjetaMascota from '../components/TarjetaMascota';
import axiosInstance from '../../../shared/api/axios';
import { useAuth } from '../../auth/context/AuthProvider';

const DeseadosPage = () => {
    const { accessToken, user } = useAuth();
    const [mascotas, setMascotas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accessToken) return;

        axiosInstance.get('/deseados')
            .then(res => {
                setMascotas(res.data?.mascotas || []);
            })
            .catch(err => {
                console.error("Error al obtener mascotas deseadas:", err);
            })
            .finally(() => setLoading(false));
    }, [accessToken]);

    return (
        <div className="p-6 bg-background min-h-screen font-sans">
            <h1 className="text-3xl font-heading text-text mb-8">Mascotas deseadas</h1>

            {loading ? (
                <p className="text-muted">Cargando...</p>
            ) : mascotas.length === 0 ? (
                <p className="text-muted">Aún no has marcado ninguna mascota como deseada.</p>
            ) : (
                <div className="space-y-6">
                    {mascotas.map(m => (
                        <TarjetaMascota
                            key={m.mascotaId}
                            mascota={{
                                mascotaId: m.mascotaId,
                                nombre: m.nombre,
                                especieMascota: m.especieMascota,
                                edad: m.edad,
                                descripcion: m.temperamento || 'Sin descripción disponible',
                                imagen: m.imagen || '/placeholder.png',
                                contactoUrl: `/perfil/${m.mascotaId}`,
                                usuarioId: m.usuarioId
                            }}
                            usuarioActualId={user?.usuarioId || 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeseadosPage;
