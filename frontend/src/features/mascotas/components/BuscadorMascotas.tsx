import { useEffect, useState, useRef } from 'react';

type Props = {
  ubicaciones: string[];
  onBuscar: (texto: string) => void;
  onAbrirFiltros: () => void;
};

const BARRIOS = [
  { nombre: 'Palermo', latitud: -34.5890, longitud: -58.4300 },
  { nombre: 'Almagro', latitud: -34.6060, longitud: -58.4210 },
  { nombre: 'Caballito', latitud: -34.6187, longitud: -58.4428 },
  { nombre: 'Villa Crespo', latitud: -34.5980, longitud: -58.4420 },
  { nombre: 'Recoleta', latitud: -34.5875, longitud: -58.3975 },
  { nombre: 'Belgrano', latitud: -34.5627, longitud: -58.4567 },
  { nombre: 'San Telmo', latitud: -34.6205, longitud: -58.3712 },
];

const BuscadorMascotas = ({ ubicaciones, onBuscar, onAbrirFiltros }: Props) => {
  const [query, setQuery] = useState('');
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSugerencias([]);
      return;
    }

    const textoNormalizado = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Filtramos distritos del backend
    const resultadosDistritos = ubicaciones.filter(u =>
      u.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(textoNormalizado)
    );

    // Filtramos barrios predefinidos
    const resultadosBarrios = BARRIOS.map(b => b.nombre).filter(b =>
      b.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(textoNormalizado)
    );

    // Combinamos y eliminamos duplicados, límite de 7 sugerencias
    setSugerencias([...new Set([...resultadosDistritos, ...resultadosBarrios])].slice(0, 7));
  }, [query, ubicaciones]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contenedorRef.current && !contenedorRef.current.contains(event.target as Node)) {
        setSugerencias([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSeleccion = (texto: string) => {
    setQuery(texto);
    setSugerencias([]);
    onBuscar(texto);
  };

  const handleBuscarClick = () => {
    if (query.trim()) {
      onBuscar(query.trim());
    }
  };

  return (
    <div ref={contenedorRef} className="w-[320px] space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-text">Hola Bienvenido!</h2>
        <img src="/Filter.svg" alt="Filtro" className="w-6 h-6 cursor-pointer" onClick={onAbrirFiltros} />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Busca por barrio, ciudad o provincia"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded-full bg-[#CDEDF2] text-text placeholder:text-muted focus:outline-none"
        />
        <img
          src="/Search.svg"
          alt="Buscar"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
          onClick={handleBuscarClick}
        />

        {sugerencias.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-[9999]">
            {sugerencias.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSeleccion(s)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => alert('Localización aún no implementada')}
        className="flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <img src="/location.svg" alt="Ubicación" className="w-4 h-4" />
        Localiza mi ubicación
      </button>
    </div>
  );
};

export default BuscadorMascotas;