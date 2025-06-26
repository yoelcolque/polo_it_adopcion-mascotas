import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthProvider';
import { useDeseos } from '../../../shared/context/DeseosContext';
import axiosInstance from '../../../shared/api/axios';
import { useState } from 'react';

interface Mascota {
  mascotaId: number;
  nombre: string;
  especieMascota: string;
  edad: number;
  descripcion: string;
  imagen: string;
  contactoUrl: string;
  usuarioId: number;
  estado: string;
  duenoEmail: string;
}

const TarjetaMascota = ({
  mascota,
  usuarioActualId,
}: {
  mascota: Mascota;
  usuarioActualId: number;
}) => {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const { isDeseado, toggleDeseado } = useDeseos();
  const estaDeseada = isDeseado(mascota.mascotaId);
  const esMia = mascota.usuarioId === usuarioActualId;
  const [estadoMascota, setEstadoMascota] = useState(mascota.estado);
  const estaInactiva = estadoMascota.toUpperCase() === 'INACTIVA';

  const handleToggle = () => {
    if (!accessToken) {
      alert('Debes iniciar sesión para marcar como deseado.');
      navigate('/login');
      return;
    }
    toggleDeseado(mascota.mascotaId);
  };

  const handleEliminar = async (mascotaId: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) return;
    try {
      const res = await axiosInstance.delete(`/mascota/${mascotaId}`);
      alert(res.data.message || 'Mascota ocultada correctamente.');
      setEstadoMascota('INACTIVA');
    } catch (err) {
      console.error('Error al ocultar mascota:', err);
      alert('Hubo un error al ocultar la mascota.');
    }
  };

  const handleActivar = async (mascotaId: number) => {
    if (!window.confirm('¿Deseas volver a activar esta mascota?')) return;
    try {
      const res = await axiosInstance.put(`/mascota/activar/${mascotaId}`);
      alert(res.data.message || 'Mascota activada correctamente.');
      setEstadoMascota('ACTIVA');
    } catch (err) {
      console.error('Error al activar mascota:', err);
      alert('Hubo un error al activar la mascota.');
    }
  };

  const handleContactar = async () => {
    if (!accessToken || !user) {
      alert('Debes iniciar sesión para contactar al dueño.');
      navigate('/login');
      return;
    }

    try {
      console.log('Iniciando chat con:', { duenoId: mascota.usuarioId, mascotaId: mascota.mascotaId });
      const res = await axiosInstance.get('/chat/obtener-o-crear', {
        params: { duenoId: mascota.usuarioId, mascotaId: mascota.mascotaId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('Respuesta de chat:', res.data);
      const chat = res.data.objeto;  // Guardamos el chat completo

      // Navegamos pasando el chat completo en el estado
      navigate(`/chat/${chat.id}`, { state: { chat } });
    } catch (error: any) {
      console.error('Error al crear/obtener chat:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'No se pudo iniciar el chat.');
    }
  };

  const cortarTexto = (texto: string, max: number = 12) => {
    return texto.length > max ? texto.slice(0, max) + '...' : texto;
  };

  return (
    <div className="w-[326px] h-[110px] flex items-center justify-between bg-surface rounded-xl p-3 shadow-sm w-full">
      <img
        src={mascota.imagen || '/placeholder.png'}
        alt={mascota.nombre}
        className="w-[85px] h-[85px] object-cover rounded-md"
      />
      <div className="flex flex-col flex-1 ml-4 text-sm">
        <span className="font-bold text-text text-base">{mascota.nombre}</span>
        <span className="truncate text-muted">{cortarTexto(mascota.descripcion || 'Sin descripción disponible.')}</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-muted">Edad</span>
          <span className="text-text">{mascota.edad ? `> ${mascota.edad} años` : 'N/D'}</span>
        </div>
        <img src="/Rating.svg" alt="Rating" className="w-20 mt-1" />
      </div>
      <div className="flex flex-col items-end gap-2">
        {!esMia && (
          <>
            <button onClick={handleToggle}>
              <img
                src="/Heart.svg"
                alt="Deseado"
                className={`w-6 h-6 ${estaDeseada ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              />
            </button>
            <Link
              to={`/mascota/${mascota.mascotaId}`}
              className="text-sm bg-primary hover:bg-primaryDark text-white px-3 py-1.5 rounded-full"
            >
              +Detalles
            </Link>
            <button
              onClick={handleContactar}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full"
            >
              Contactar
            </button>
          </>
        )}
        {esMia && (
          <div className="flex flex-col gap-2">
            <Link
              to={`/editar/${mascota.mascotaId}`}
              className="bg-primary hover:bg-primaryDark text-white px-3 py-1.5 rounded-full text-sm text-center"
            >
              Editar
            </Link>
            <button
              onClick={() =>
                estaInactiva ? handleActivar(mascota.mascotaId) : handleEliminar(mascota.mascotaId)
              }
              className={`px-3 py-1.5 rounded-full text-sm border ${estaInactiva
                  ? 'bg-primary text-white hover:bg-primaryDark'
                  : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
                }`}
            >
              {estaInactiva ? 'Publicar' : 'Ocultar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarjetaMascota;