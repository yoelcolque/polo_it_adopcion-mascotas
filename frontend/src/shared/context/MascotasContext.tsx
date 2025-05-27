import { createContext, useContext, useState } from 'react';

export interface Mascota {
    mascotaId: number;
    nombre: string;
    especieMascota: string;
    edad: number;
    descripcion?: string;
    imagen?: string;
    latitud?: number;
    longitud?: number;
}

interface MascotasContextType {
    mascotas: Mascota[];
    setMascotas: (nuevas: Mascota[]) => void;
}

const MascotasContext = createContext<MascotasContextType>({} as MascotasContextType);

export const MascotasProvider = ({ children }: { children: React.ReactNode }) => {
    const [mascotas, setMascotas] = useState<Mascota[]>([]);

    return (
        <MascotasContext.Provider value={{ mascotas, setMascotas }}>
            {children}
        </MascotasContext.Provider>
    );
};

export const useMascotas = () => useContext(MascotasContext);
