import { useEffect, useState } from 'react';
import TarjetaMascota from '../../mascotas/components/TarjetaMascota';
import axiosInstance from '../../../shared/api/axios';
import { useAuth } from '../../auth/context/AuthProvider';

const UsuariosPage = () => {
    const [mascotas, setMascotas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const res = await axiosInstance.get('/mascota/usuario');
                setMascotas(res.data?.mascotas || []);
            } catch (err) {
                console.error("Error al obtener mascotas del usuario:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);

    const actualizarMascota = (mascotaActualizada: any) => {
        setMascotas(prev =>
            prev.map(m => (m.mascotaId === mascotaActualizada.mascotaId ? mascotaActualizada : m))
        );
    };

    return (
        <div className="p-6 bg-background min-h-screen font-sans">
            <h1 className="text-3xl font-heading text-text mb-8">Mis Mascotas</h1>

            {loading ? (
                <p className="text-muted">Cargando...</p>
            ) : mascotas.length === 0 ? (
                <p className="text-muted">Aún no registraste ninguna mascota.</p>
            ) : (
                <div className="space-y-6">
                    {mascotas.map(m => (
                        <TarjetaMascota
                            key={m.mascotaId}
                            mascota={m}
                            usuarioActualId={user?.usuarioId || 0}
                            onActualizar={actualizarMascota}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UsuariosPage;
