import { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/api/axios';
import { useAuth } from '../../auth/context/AuthProvider';
import TarjetaMascota from '../components/TarjetaMascota';

interface Mascota {
  mascotaId: number;
  nombre: string;
  duenoEmail: string;
  especieMascota?: string;
  edad?: number;
  descripcion?: string;
  imagen?: string;
  contactoUrl?: string;
  usuarioId?: number;
  estado?: string;
}

const DeseadosPage = () => {
  const { user, accessToken } = useAuth();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  useEffect(() => {
    const fetchDeseados = async () => {
      if (!user || !accessToken) {
        console.log('No user or accessToken, skipping fetchDeseados', { user, accessToken });
        setMascotas([]);
        return;
      }
      try {
        console.log('Fetching deseados from /deseados with token:', accessToken);
        const res = await axiosInstance.get('/deseados', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('Deseados response:', JSON.stringify(res.data, null, 2));
        setMascotas(res.data.mascotas || []);
      } catch (err: any) {
        console.error('Error al obtener mascotas deseadas:', err.response?.data || err.message);
        setMascotas([]);
      }
    };

    fetchDeseados();
  }, [user, accessToken]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Mascotas Deseadas</h1>
      {mascotas.length === 0 ? (
        <p>Aún no has marcado ninguna mascota como deseada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mascotas.map((mascota) => (
            <TarjetaMascota key={mascota.mascotaId} mascota={mascota} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeseadosPage;