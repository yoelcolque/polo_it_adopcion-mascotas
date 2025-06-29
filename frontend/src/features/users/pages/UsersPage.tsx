import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';
import TarjetaMascota from '../../mascotas/components/TarjetaMascota';
import { useAuth } from '../../auth/context/AuthProvider';

interface Mascota {
  mascotaId: number;
  nombre: string;
  especieMascota: string;
  edad: number;
  temperamento: string;
  imagen: string;
  usuarioId: number;
  estado: string;
  duenoEmail: string;
}

const UsersPage = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [mascotasFiltradas, setMascotasFiltradas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  // Obtener todas las mascotas
  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        console.log('Fetching mascotas from /mascota/todas');
        const res = await axiosInstance.get('/mascota/todas');
        console.log('Mascotas response:', JSON.stringify(res.data, null, 2));
        setMascotas(res.data.mascotas || []);
      } catch (err: any) {
        console.error('Error al obtener mascotas:', err.response?.data || err.message);
        setError('No se pudieron cargar las mascotas. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

  // Filtrar mascotas usando email
  useEffect(() => {
    console.log('Filtering mascotas. user:', user, 'mascotas:', mascotas);
    if (!user) {
      setMascotasFiltradas(mascotas);
    } else {
      const filtradas = mascotas.filter(
        (mascota: Mascota) => mascota.duenoEmail.toLowerCase() !== user.email.toLowerCase()
      );
      setMascotasFiltradas(filtradas);
      console.log('Mascotas filtradas:', filtradas, 'email:', user.email);
    }
  }, [mascotas, user]);

  return (
    <div className="min-h-screen bg-background p-6 font-sans">
      <section className="relative mb-10">
        <img
          src="/home-image.jpeg"
          alt="Mascotas esperando un hogar"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
      </section>
      <div>
        <h2 className="text-2xl font-heading text-text mb-6">Mascotas registradas</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {loading ? (
          <p className="text-muted">Cargando mascotas...</p>
        ) : mascotasFiltradas.length === 0 ? (
          <p className="text-muted">
            {user
              ? 'No hay mascotas disponibles de otros usuarios.'
              : 'No hay mascotas disponibles.'}
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md-e:grid-cols-2 lg-e:grid-cols-3 gap-6 justify-items-center">
            {mascotasFiltradas.map((m) => (
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
                  duenoEmail: m.duenoEmail,
                }}
                usuarioActualId={0} // Temporal hasta que obtengamos usuarioId
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;