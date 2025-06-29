import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../../features/auth/context/AuthProvider';

interface DeseosContextType {
  deseados: number[];
  toggleDeseado: (mascotaId: number) => Promise<void>;
  isDeseado: (mascotaId: number) => boolean;
}

const DeseosContext = createContext<DeseosContextType>({} as DeseosContextType);

export const DeseosProvider = ({ children }: { children: React.ReactNode }) => {
  const [deseados, setDeseados] = useState<number[]>([]);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    const fetchDeseados = async () => {
      if (!user || !accessToken) {
        console.log('No user or accessToken, skipping fetchDeseados', { user, accessToken });
        setDeseados([]);
        return;
      }
      try {
        console.log('Fetching deseados from /deseados with token:', accessToken);
        const res = await axiosInstance.get('/deseados', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('Deseados response:', JSON.stringify(res.data, null, 2));
        setDeseados(res.data.mascotas?.map((m: any) => m.mascotaId) || []);
      } catch (err: any) {
        console.error('Error al obtener lista de deseos:', err.response?.data || err.message);
        setDeseados([]);
      }
    };

    fetchDeseados();
  }, [user, accessToken]);

  const toggleDeseado = async (mascotaId: number) => {
    if (!user || !accessToken) {
      console.log('No user or accessToken, cannot toggle deseado', { user, accessToken });
      return;
    }
    try {
      console.log('Token enviado:', accessToken);
      console.log(`Attempting to toggle deseado for mascotaId: ${mascotaId}`);
      if (deseados.includes(mascotaId)) {
        console.log(`Removing mascota ${mascotaId} from deseados`);
        await axiosInstance.delete(`/deseados/${mascotaId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setDeseados(deseados.filter((id) => id !== mascotaId));
      } else {
        console.log(`Adding mascota ${mascotaId} to deseados`);
        const response = await axiosInstance.post(`/deseados/${mascotaId}`, null, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('POST response:', JSON.stringify(response.data, null, 2));
        setDeseados([...deseados, mascotaId]);
      }
    } catch (err: any) {
      console.error('Error al modificar deseado:', err.response?.data || err.message);
      alert(`No se pudo modificar la lista de deseos: ${err.response?.data?.message || err.message}`);
    }
  };

  const isDeseado = (mascotaId: number) => deseados.includes(mascotaId);

  return (
    <DeseosContext.Provider value={{ deseados, toggleDeseado, isDeseado }}>
      {children}
    </DeseosContext.Provider>
  );
};

export const useDeseos = () => useContext(DeseosContext);