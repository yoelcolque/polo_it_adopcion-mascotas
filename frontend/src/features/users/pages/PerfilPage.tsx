import { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/api/axios';
import TarjetaMascota from '../../mascotas/components/TarjetaMascota';
import { useAuth } from '../../auth/context/AuthProvider';

const PerfilPage = () => {
    const { accessToken } = useAuth();
    const [usuario, setUsuario] = useState<any>(null);
    const [mascotas, setMascotas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfilYmascotas = async () => {
            if (!accessToken) {
                return;
            }

            try {
                const res = await axiosInstance.get('/usuarios/me');
                const perfil = res.data?.usuario;

                if (!perfil || !perfil.nombre) {
                    console.warn('Perfil inválido:', perfil);
                    return;
                }

                setUsuario(perfil);

                const mascotasRes = await axiosInstance.get('/mascota/usuario');
                setMascotas(mascotasRes.data?.mascotas || []);
            } catch (err) {
                console.error('Error al cargar perfil o mascotas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfilYmascotas();
    }, [accessToken]);

    if (loading) {
        return <p className="p-6 text-muted">Cargando perfil...</p>;
    }

    if (!usuario) {
        return <p className="p-6 text-error">No se pudo cargar el perfil del usuario.</p>;
    }

    const { logout } = useAuth();
    return (
        <div className="min-h-screen p-6 bg-background font-sans">
            <div className="grid grid-cols-[150px_1fr_1fr] grid-rows-[auto_auto_auto] gap-4">
                {/* Imagen */}
                <div className="row-span-2 flex justify-center items-center">
                    <img
                        src={usuario.fotoPerfil || '/placeholder.png'}
                        alt="Perfil"
                        className="w-28 h-28 rounded-full object-cover border"
                    />
                </div>

                {/* Datos */}
                <div className="col-span-2 flex flex-col gap-2 text-text">
                    <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                </div>

                {/* Mascotas */}
                <div className="col-span-3 mt-8">
                    <h2 className="text-2xl font-heading mb-4">Mascotas registradas</h2>
                    <div className="space-y-4">
                        {mascotas.length === 0 ? (
                            <p className="text-muted">No hay mascotas asociadas.</p>
                        ) : (
                            mascotas.map(m => (
                                <TarjetaMascota
                                    key={m.mascotaId}
                                    mascota={{
                                        mascotaId: m.mascotaId,
                                        nombre: m.nombre,
                                        especieMascota: m.especieMascota,
                                        edad: m.edad,
                                        descripcion: m.temperamento || 'Sin descripción',
                                        imagen: m.imagen || '/placeholder.png',
                                        contactoUrl: `/perfil/${m.mascotaId}`,
                                        usuarioId: m.usuarioId,
                                        estado: m.estado,
                                    }}
                                    usuarioActualId={usuario.usuarioId}
                                />

                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilPage;
