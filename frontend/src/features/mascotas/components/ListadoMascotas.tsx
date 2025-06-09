import TarjetaMascota from './TarjetaMascota';

type Mascota = {
    mascotaId: number;
    nombre: string;
    especieMascota?: string;
    edad?: number;
    descripcion?: string;
    imagen?: string;
    contactoUrl?: string;
    usuarioId: number;
    estado?: string;
};

type Props = {
    mascotas: Mascota[];
    usuarioActualId: number;
};

const ListadoMascotas = ({ mascotas, usuarioActualId }: Props) => {
    if (mascotas.length === 0) {
        return <p className="text-muted">No hay resultados para mostrar.</p>;
    }

    return (
        <div
            className={`
            overflow-y-auto
            max-h-[700px]
            pb-2
        `}
        >
            <div className="grid sm:grid-cols-1 md-e:grid-cols-2 lg-e:grid-cols-3 gap-6 justify-items-center">
                {mascotas.map(m => (
                    <TarjetaMascota
                        key={m.mascotaId}
                        mascota={m}
                        usuarioActualId={usuarioActualId}
                    />
                ))}
            </div>
        </div>
    );


};

export default ListadoMascotas;
