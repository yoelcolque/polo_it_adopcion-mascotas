export type Mascota = {
    mascotaId: number;
    nombre: string;
    latitud: number;
    longitud: number;
    ubicacionTexto?: string;
    especieMascota?: string;
    sexoMascota?: string;
    edad?: number;
    vacunado?: boolean;
    esterilizado?: boolean;
};

export type PuntoUbicacionProps = {
    top: string;
    left: string;
    mascota: Mascota;
};
