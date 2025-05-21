import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';
import TarjetaMascotaResumen from '../../mascotas/components/TarjetaMascotaResumen';

const UsersPage = () => {
    const [mascotas, setMascotas] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchMascotas = async () => {
        try {
            const res = await axiosInstance.get('/usuarios/');
            setMascotas(res.data);
        } catch (err) {
            console.error('Error al obtener mascotas:', err);
        }
    };

    useEffect(() => {
        fetchMascotas();
    }, []);

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

                <div className="space-y-4">
                    {mascotas.length === 0 ? (
                        <p className="text-muted">No hay mascotas cargadas aún.</p>
                    ) : (
                        mascotas.map((m, i) => (
                            <TarjetaMascotaResumen
                                key={i}
                                mascota={m}
                                onEditar={() => navigate(`/editar/${m.id}`)}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default UsersPage;
