import { useState } from 'react';

const BuscadorMascotas = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        console.log("Buscar:", query);
        // Aquí va la lógica para invocar la API o filtrar las mascotas
    };

    const handleLocalizar = () => {
        console.log("Localizar ubicación actual");
        // Aquí va la lógica para geolocalizar al usuario
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md space-y-3">
            {/* Saludo y filtro */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-text">Hola Alejandra!</h2>
                <img src="/Filter.svg" alt="Filtro" className="w-6 h-6 cursor-pointer" />
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="¿Dónde buscas mascotas?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 rounded-full bg-[#CDEDF2] text-text placeholder:text-muted focus:outline-none"
                />
                <img
                    src="/Search.svg"
                    alt="Buscar"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                    onClick={handleSearch}
                />
            </div>

            {/* Botón de localización */}
            <button
                onClick={handleLocalizar}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
                <img src="/Location.svg" alt="Ubicación" className="w-4 h-4" />
                Localiza mi ubicación
            </button>
        </div>
    );
};

export default BuscadorMascotas;
or;