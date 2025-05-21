export type Mascota = {
    nombre: string;
    imagenUrl?: string;
    especie?: string;
    edad?: string;
    descripcion?: string;
};

export type PuntoUbicacionProps = {
    top: string;
    left: string;
    mascota: Mascota;
};
