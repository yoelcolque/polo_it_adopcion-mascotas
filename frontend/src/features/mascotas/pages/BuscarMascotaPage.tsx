import { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/api/axios';
import BuscadorMascotas from '../components/BuscadorMascotas';
import MapaUbicacion from '../components/MapaUbicacion';
import FiltroMascotas from '../components/FiltrosMascota';
import ListadoMascotas from '../../mascotas/components/ListadoMascotas';
import { useAuth } from '../../auth/context/AuthProvider';

interface Mascota {
  mascotaId: number;
  nombre: string;
  duenoEmail: string;
  latitud: number;
  longitud: number;
  distrito?: string;
  direccion?: string;
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

interface Filtros {
  especieMascota?: string;
  sexoMascota?: string;
  edad?: number;
  vacunado?: boolean;
  esterilizado?: boolean;
}

const BARRIOS = [
  { nombre: 'Palermo', latitud: -34.5890, longitud: -58.4300 },
  { nombre: 'Almagro', latitud: -34.6060, longitud: -58.4210 },
  { nombre: 'Caballito', latitud: -34.6187, longitud: -58.4428 },
  { nombre: 'Villa Crespo', latitud: -34.5980, longitud: -58.4420 },
  { nombre: 'Recoleta', latitud: -34.5875, longitud: -58.3975 },
  { nombre: 'Belgrano', latitud: -34.5627, longitud: -58.4567 },
  { nombre: 'San Telmo', latitud: -34.6205, longitud: -58.3712 },
];

const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};

const BuscarMascotaPage = () => {
  const { user } = useAuth();
  const [textoBuscado, setTextoBuscado] = useState('');
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [filtradas, setFiltradas] = useState<Mascota[]>([]);
  const [ubicaciones, setUbicaciones] = useState<string[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({});
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const normalizar = (str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const aplicarFiltros = (textoUbicacion?: string, filtrosLocales?: Filtros) => {
    const filtrosAplicados = filtrosLocales || filtros;
    const textoNormalizado = textoUbicacion ? normalizar(textoUbicacion) : '';

    const resultado = mascotas.filter(m => {
      // Buscar por distrito o dirección
      const textoMascota = `${m.distrito || ''} ${m.direccion || ''}`.trim();
      const cumpleUbicacionTexto = textoUbicacion
        ? normalizar(textoMascota).includes(textoNormalizado)
        : true;

      // Buscar por barrio usando coordenadas (radio de 2 km)
      const barrio = BARRIOS.find(b => normalizar(b.nombre) === textoNormalizado);
      const cumpleUbicacionBarrio = barrio
        ? m.latitud && m.longitud && calcularDistancia(m.latitud, m.longitud, barrio.latitud, barrio.longitud) <= 2
        : true;

      const cumpleUbicacion = textoUbicacion ? cumpleUbicacionTexto || cumpleUbicacionBarrio : true;

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

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const res = await axiosInstance.get('/mascota/todas');
        const lista: Mascota[] = res.data?.mascotas || [];
        console.log('Mascotas obtenidas:', JSON.stringify(lista, null, 2));
        setMascotas(lista);
        setFiltradas(lista);

        // Generamos ubicaciones desde distritos y barrios predefinidos
        const distritos = Array.from(new Set(lista.map(m => m.distrito?.trim()).filter((d): d is string => !!d)));
        const ubicacionesFormateadas = [...new Set([...distritos, ...BARRIOS.map(b => b.nombre)])];

        console.log('Ubicaciones:', ubicacionesFormateadas);
        setUbicaciones(ubicacionesFormateadas);
      } catch (err) {
        console.error('Error al obtener mascotas:', err);
      }
    };

    void fetchMascotas();
  }, []);

  return (
    <div className="overflow-hidden bg-background font-sans">
      <div className="container mx-auto p-4">
        <section className="mb-4">
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

        <section>
          {!mostrarResultados ? (
            <div className="relative">
              <MapaUbicacion mascotas={filtradas} />
              <button
                onClick={() => setMostrarResultados(true)}
                className="md:hidden w-[320px] absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-b-2xl shadow-lg text-sm font-semibold flex justify-center items-center gap-2"
              >
                Ver {filtradas.length}+ resultados
                <span className="text-lg">→</span>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setMostrarResultados(false)}
                className="md:hidden mb-4 bg-primary text-white px-6 py-2 rounded-2xl shadow-lg text-sm font-semibold flex items-center gap-2"
              >
                Volver al mapa
                <span className="text-lg">←</span>
              </button>
              <ListadoMascotas mascotas={filtradas} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BuscarMascotaPage;