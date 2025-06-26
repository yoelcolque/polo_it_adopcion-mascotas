export interface ChatDTO {
  id: number;
  adoptante: {
    usuarioId: number;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string;
  };
  dueno: {
    usuarioId: number;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string;
  };
  mascota: {
    mascotaId: number;
    nombre: string;
    edad: number;
    imagen: string;
    especieMascota: string;
  };
}

export interface MensajeDTO {
  chatId: number;
  emisorId: number;
  receptorId: number;
  contenido: string;
}