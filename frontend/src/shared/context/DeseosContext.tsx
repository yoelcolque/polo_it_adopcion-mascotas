import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

interface DeseosContextType {
    deseados: Set<number>; // mascotaId
    toggleDeseado: (mascotaId: number) => Promise<void>;
    isDeseado: (mascotaId: number) => boolean;
    cargando: boolean;
}

const DeseosContext = createContext<DeseosContextType>({} as DeseosContextType);

export const DeseosProvider = ({ children }: { children: React.ReactNode }) => {
    const [deseados, setDeseados] = useState<Set<number>>(new Set());
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchDeseados = async () => {
            try {
                const res = await axiosInstance.get('/deseados');
                const lista = res.data?.mascotas || [];
                const ids = new Set(lista.map((m: any) => m.mascotaId));
                setDeseados(ids);
            } catch (err) {
                console.error('Error al obtener lista de deseos', err);
            } finally {
                setCargando(false);
            }
        };

        fetchDeseados();
    }, []);

    const toggleDeseado = async (mascotaId: number) => {
        try {
            if (deseados.has(mascotaId)) {
                await axiosInstance.delete(`/deseados/${mascotaId}`);
                setDeseados(prev => {
                    const nuevo = new Set(prev);
                    nuevo.delete(mascotaId);
                    return nuevo;
                });
            } else {
                await axiosInstance.post(`/deseados/${mascotaId}`);
                setDeseados(prev => new Set(prev).add(mascotaId));
            }
        } catch (err) {
            console.error('Error al alternar deseo', err);
        }
    };

    const isDeseado = (mascotaId: number) => deseados.has(mascotaId);

    return (
        <DeseosContext.Provider value={{ deseados, toggleDeseado, isDeseado, cargando }}>
            {children}
        </DeseosContext.Provider>
    );
};

export const useDeseos = () => useContext(DeseosContext);
