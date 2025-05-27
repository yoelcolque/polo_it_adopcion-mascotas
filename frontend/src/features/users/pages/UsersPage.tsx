import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';
import TarjetaMascota from '../../mascotas/components/TarjetaMascota';

const UsersPage = () => {
    const [mascotas, setMascotas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const res = await axiosInstance.get('/mascota'); // sin necesidad de token
                setMascotas(res.data?.mascotas || []);
            } catch (err) {
                console.error('Error al obtener mascotas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []); // ← sin dependencia de accessToken



    return (
        <div className="min-h-screen bg-background p-6 font-sans">
            {/* Hero */}
            <section className="relative mb-10">
                <img
                    src="/banner-mascotas.jpg"
                    alt="Mascotas esperando un hogar"
                    className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <h1 className="absolute top-1/2 left-1/2 text-4xl text-white font-heading drop-shadow-md transform -translate-x-1/2 -translate-y-1/2">
                    Mascotas esperando un hogar
                </h1>
            </section>

            {/* Mascotas registradas */}
            <main>
                <h2 className="text-2xl font-heading text-text mb-6">Mascotas registradas</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mascotas.length === 0 ? (
                        <p className="text-muted">No hay mascotas cargadas aún.</p>
                    ) : (
                        mascotas.map(m => (
                            <TarjetaMascota
                                key={m.mascotaId}
                                mascota={{
                                    id: m.mascotaId,
                                    nombre: m.nombre,
                                    especie: m.especieMascota,
                                    edad: `${m.edad} años`,
                                    descripcion: m.temperamento || 'Sin descripción',
                                    imagenUrl: m.fotos?.[0] || '/placeholder.png',
                                    contactoUrl: `/perfil/${m.mascotaId}`
                                }}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default UsersPage;
