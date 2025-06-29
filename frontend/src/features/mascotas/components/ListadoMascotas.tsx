import TarjetaMascota from './TarjetaMascota';
import { useAuth } from '../../auth/context/AuthProvider';

interface Mascota {
  mascotaId: number;
  nombre: string;
  duenoEmail: string;
  latitud?: number;
  longitud?: number;
  ubicacionTexto?: string;
  especieMascota?: string;
  sexoMascota?: string;
  edad?: number;
  vacunado?: boolean;
  esterilizado?: boolean;
  descripcion?: string;
  imagen?: string;
  contactoUrl?: string;
  estado?: string;
}

interface ListadoMascotasProps {
  mascotas: Mascota[];
}

const ListadoMascotas = ({ mascotas }: ListadoMascotasProps) => {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mascotas.map((mascota) => (
        <TarjetaMascota key={mascota.mascotaId} mascota={mascota} user={user} />
      ))}
    </div>
  );
};

export default ListadoMascotas;