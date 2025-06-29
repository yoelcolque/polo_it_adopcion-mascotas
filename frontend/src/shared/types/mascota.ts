type Mascota = {
  mascotaId: number;
  nombre: string;
  duenoEmail: string; 
  latitud: number;
  longitud: number;
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
};
export type PuntoUbicacionProps = {
    top: string;
    left: string;
    mascota: Mascota;
};
