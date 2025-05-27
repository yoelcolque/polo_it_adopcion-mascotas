import { createContext, useContext, useState } from 'react';

interface Coordenadas {
    lat: number;
    lon: number;
}

interface MapaContextType {
    coordenadas: Coordenadas;
    setCoordenadas: (coords: Coordenadas) => void;
}

const MapaContext = createContext<MapaContextType>({} as MapaContextType);

export const MapaProvider = ({ children }: { children: React.ReactNode }) => {
    const [coordenadas, setCoordenadas] = useState<Coordenadas>({
        lat: -34.6037, // Obelisco ... este dato es por defecto no toma en cuenta la direccion del usurio => hay que cambiarlo
        lon: -58.3816,
    });

    return (
        <MapaContext.Provider value={{ coordenadas, setCoordenadas }}>
            {children}
        </MapaContext.Provider>
    );
};

export const useMapa = () => useContext(MapaContext);
