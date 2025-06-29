import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthProvider';
import axiosInstance from '../../../shared/api/axios';
import { useState } from 'react';
import { useDeseos } from '../../../shared/context/DeseosContext';

interface Mascota {
  mascotaId: number;
  nombre: string;
  duenoEmail: string;
  especieMascota?: string;
  edad?: number;
  descripcion?: string;
  imagen?: string;
  contactoUrl?: string;
  estado?: string;
  // otros campos...
}

interface TarjetaMascotaProps {
  mascota: Mascota;
  user?: { email: string }; // email usuario actual para comparación
  isDeseado?: boolean;
  toggleDeseado?: (mascotaId: number) => Promise<void>;
}

const TarjetaMascota = ({
  mascota,
  user: propUser,
  isDeseado: propIsDeseado,
  toggleDeseado: propToggleDeseado,
}: TarjetaMascotaProps) => {
  const { accessToken, user: authUser } = useAuth();
  const { isDeseado: contextIsDeseado, toggleDeseado: contextToggleDeseado } = useDeseos();
  const navigate = useNavigate();
  const user = propUser || authUser;

  const isDeseado = propIsDeseado !== undefined ? propIsDeseado : contextIsDeseado(mascota.mascotaId);
  const toggleDeseado = propToggleDeseado || contextToggleDeseado;

  const esMia =
    typeof mascota.duenoEmail === 'string' &&
    typeof user?.email === 'string' &&
    mascota.duenoEmail.toLowerCase() === user.email.toLowerCase();

  const [estadoMascota, setEstadoMascota] = useState(mascota.estado || 'ACTIVA');
  const estaInactiva = estadoMascota.toUpperCase() === 'INACTIVA';

  const handleToggle = async () => {
    if (!accessToken || !user) {
      alert('Debes iniciar sesión para marcar como deseado.');
      navigate('/login');
      return;
    }
    try {
      await toggleDeseado(mascota.mascotaId);
      console.log(`Mascota ${mascota.mascotaId} ${isDeseado ? 'eliminada de' : 'agregada a'} deseos`);
    } catch (err: any) {
      console.error('Error al togglear deseo:', err.response?.data || err.message);
      alert('No se pudo actualizar la lista de deseados.');
    }
  };

  const handleContactar = async () => {
    if (!accessToken || !user) {
      alert('Debes iniciar sesión para contactar al dueño.');
      navigate('/login');
      return;
    }
    try {
      const res = await axiosInstance.get('/chat/obtener-o-crear', {
        params: { duenoEmail: mascota.duenoEmail, mascotaId: mascota.mascotaId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const chat = res.data.objeto;
      navigate(`/chat/${chat.id}`, { state: { chat } });
    } catch (error: any) {
      console.error('Error al crear/obtener chat:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'No se pudo iniciar el chat.');
    }
  };

  const handleEliminar = async (mascotaId: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) return;
    try {
      const res = await axiosInstance.delete(`/mascota/${mascotaId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert(res.data.message || 'Mascota ocultada correctamente.');
      setEstadoMascota('INACTIVA');
    } catch (err: any) {
      console.error('Error al ocultar mascota:', err.response?.data || err.message);
      alert('Hubo un error al ocultar la mascota.');
    }
  };

  const handleActivar = async (mascotaId: number) => {
    if (!window.confirm('¿Deseas volver a activar esta mascota?')) return;
    try {
      const res = await axiosInstance.put(`/mascota/activar/${mascotaId}`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert(res.data.message || 'Mascota activada correctamente.');
      setEstadoMascota('ACTIVA');
    } catch (err: any) {
      console.error('Error al activar mascota:', err.response?.data || err.message);
      alert('Hubo un error al activar la mascota.');
    }
  };

  const cortarTexto = (texto: string, max: number = 12) => {
    return texto.length > max ? texto.slice(0, max) + '...' : texto;
  };

  return (
    <div className="w-full max-w-4xl h-[150px] flex items-center justify-between bg-surface rounded-xl p-3 shadow-sm">
      <img
        src={mascota.imagen || '/placeholder.png'}
        alt={mascota.nombre}
        className="w-[85px] h-[85px] object-cover rounded-md"
      />
      <div className="flex flex-col flex-1 ml-4 text-sm">
        <span className="font-bold text-text text-base">{mascota.nombre}</span>
        <span className="truncate text-muted">
          {mascota.descripcion ? cortarTexto(mascota.descripcion) : 'Sin descripción'}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-muted">Edad</span>
          <span className="text-text">{mascota.edad ? `> ${mascota.edad} años` : 'N/D'}</span>
        </div>
        <img src="/Rating.svg" alt="Rating" className="w-20 mt-1" />
      </div>
      <div className="flex flex-col items-end gap-2">
        {/* Mostrar botones Editar/Ocultar solo si es mi mascota */}
        {esMia ? (
          <div className="flex flex-col gap-2">
            <Link
              to={`/editar/${mascota.mascotaId}`}
              className="bg-primary hover:bg-primaryDark !text-white px-3 py-1.5 rounded-full text-sm text-center"
            >
              Editar
            </Link>
            <button
              onClick={() =>
                estaInactiva ? handleActivar(mascota.mascotaId) : handleEliminar(mascota.mascotaId)
              }
              className={`px-3 py-1.5 rounded-full text-sm border ${
                estaInactiva
                  ? 'bg-primary !text-white hover:bg-primaryDark'
                  : 'bg-white text-primary border-primary hover:bg-primary hover:!text-white'
              }`}
            >
              {estaInactiva ? 'Publicar' : 'Ocultar'}
            </button>
          </div>
        ) : (
          // Para mascotas que no son mías, mostramos Deseado, Detalles y Contactar
          <>
            <button onClick={handleToggle}>
              <span
                className={`text-2xl ${
                  isDeseado ? 'text-red-500 opacity-100' : 'text-gray-500 opacity-40 hover:opacity-100'
                }`}
              >
                ❤️
              </span>
            </button>
            <Link
              to={`/mascota/${mascota.mascotaId}`}
              className="text-sm bg-primary hover:bg-primaryDark !text-white px-3 py-1.5 rounded-full"
            >
              +Detalles
            </Link>
            <button
              onClick={handleContactar}
              className="text-sm bg-blue-600 hover:bg-blue-700 !text-white px-3 py-1.5 rounded-full"
            >
              Contactar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TarjetaMascota;