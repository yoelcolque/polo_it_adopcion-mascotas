import { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/api/axios';
import BuscadorMascotas from '../components/BuscadorMascotas';
import MapaUbicacion from '../components/MapaUbicacion';
import FiltroMascotas from '../components/FiltrosMascota';
import ListadoMascotas from '../../mascotas/components/ListadoMascotas';


type Mascota = {
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


//---------------------------
export type Filtros = {
    especieMascota?: string;
    sexoMascota?: string;
    edad?: number;
    vacunado?: boolean;
    esterilizado?: boolean;
};

//---------------------------

function extraerUbicacionFormateada(texto: string): string {
    const partes = texto.split(',').map(p => p.trim());
    if (partes.length < 4) return texto;
    return partes.slice(-4, -1).join(', ');
}

const BuscarMascotaPage = () => {
    const [textoBuscado, setTextoBuscado] = useState('');
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [filtradas, setFiltradas] = useState<Mascota[]>([]);
    const [ubicaciones, setUbicaciones] = useState<string[]>([]);
    //--------------------------------------------------
    const [filtros, setFiltros] = useState<Filtros>({});
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    //---------------------------

    const aplicarFiltros = (textoUbicacion?: string, filtrosLocales?: Filtros) => {
        const normalizar = (str: string) =>
            str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtrosAplicados = filtrosLocales || filtros;

        const resultado = mascotas.filter(m => {
            const cumpleUbicacion = textoUbicacion
                ? m.ubicacionTexto &&
                normalizar(extraerUbicacionFormateada(m.ubicacionTexto)).includes(normalizar(textoUbicacion))
                : true;

            const cumpleFiltros =
                (!filtrosAplicados.especieMascota || m.especieMascota === filtrosAplicados.especieMascota) &&
                (!filtrosAplicados.sexoMascota || m.sexoMascota === filtrosAplicados.sexoMascota) &&
                (!filtrosAplicados.edad || m.edad === filtrosAplicados.edad) &&
                (filtrosAplicados.vacunado === undefined || m.vacunado === filtrosAplicados.vacunado) &&
                (filtrosAplicados.esterilizado === undefined || m.esterilizado === filtrosAplicados.esterilizado);

            return cumpleUbicacion && cumpleFiltros;
        });

        setFiltradas(resultado);
    };

//---------------------------



    //--------------------------------------------------
    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const res = await axiosInstance.get('/mascota/todas');
                const lista: Mascota[] = res.data?.mascotas || [];

                setMascotas(lista);
                setFiltradas(lista);

                const ubicacionesFormateadas = Array.from(
                    new Set(
                        lista
                            .map(m => m.ubicacionTexto?.trim())
                            .filter((u): u is string => !!u)
                            .map(extraerUbicacionFormateada)
                    )
                );

                console.log(ubicacionesFormateadas)
                setUbicaciones(ubicacionesFormateadas);
            } catch (err) {
                console.error('Error al obtener mascotas:', err);
            }
        };

        void fetchMascotas();
    }, []);


    return (
        <div className="overflow-hidden bg-background font-sans">
            <div
                className="grid grid-cols-3 grid-rows-[auto_1fr] gap-4 pl-4 pt-2 justify-center"
                style={{ gridTemplateAreas: `'buscador buscador buscador' 'mapa mapa mapa'` }}
            >
                <section className="col-span-3" style={{ gridArea: 'buscador' }}>
                    <BuscadorMascotas
                        ubicaciones={ubicaciones}
                        onBuscar={(texto) => {
                            setTextoBuscado(texto);
                            aplicarFiltros(texto);
                        }}
                        onAbrirFiltros={() => setMostrarFiltros(true)}
                    />

                    {mostrarFiltros && (
                        <FiltroMascotas
                            filtros={filtros}
                            onAplicar={(nuevosFiltros: Filtros) => {
                                setFiltros(nuevosFiltros);
                                aplicarFiltros(textoBuscado, nuevosFiltros);
                            }}
                            onCerrar={() => setMostrarFiltros(false)}
                        />
                    )}

                </section>

                <section className="col-span-3" style={{ gridArea: 'mapa' }}>
                    {!mostrarResultados ? (
                        <div className="relative">
                            <MapaUbicacion mascotas={filtradas} />
                            {filtradas.length > 0 && (
                                <button
                                    onClick={() => setMostrarResultados(true)}
                                    className="w-[320px] bottom-4 bg-primary text-white px-6 py-2 rounded-b-2xl shadow-lg text-sm font-semibold flex justify-center items-center gap-2"
                                >
                                    Ver {filtradas.length}+ resultados
                                    <span className="text-lg">→</span>
                                </button>
                            )}
                        </div>
                    ) : (
                        <ListadoMascotas mascotas={filtradas} usuarioActualId={0} />
                    )}
                </section>

            </div>
        </div>
    );
};

export default BuscarMascotaPage;
