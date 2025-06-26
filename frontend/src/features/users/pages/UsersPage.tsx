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

interface UserProfile {
  email: string;
  usuarioId: number;
}

const UsersPage = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioActualId, setUsuarioActualId] = useState<number>(0);
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const res = await axiosInstance.get('/mascota/todas');
        setMascotas(res.data.mascotas || []);
      } catch (err) {
        console.error('Error al obtener mascotas:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      if (!accessToken || !user) return;
      try {
        const res = await axiosInstance.get('/usuario/perfil', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile: UserProfile = res.data;
        setUsuarioActualId(profile.usuarioId);
      } catch (err) {
        console.error('Error al obtener perfil:', err);
      }
    };

    fetchMascotas();
    fetchUserProfile();
  }, [accessToken, user]);

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
        <div className="grid sm:grid-cols-1 md-e:grid-cols-2 lg-e:grid-cols-3 gap-6 justify-items-center">
          {loading ? (
            <p className="text-muted">Cargando mascotas...</p>
          ) : mascotas.length === 0 ? (
            <p className="text-muted">No hay mascotas cargadas aún.</p>
          ) : (
            mascotas.map((m) => (
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
                usuarioActualId={usuarioActualId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;