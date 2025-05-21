import { createContext, useContext, useState, useEffect } from 'react';
import { setupAuthInterceptor } from '../../../shared/api/authInterceptor';
import axiosInstance from '../../../shared/api/axios';

interface AuthContextType {
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    contrasena: string;
    confirmar: string;
    direccion: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));

    const login = async (email: string, password: string) => {
        const res = await axiosInstance.post('/auth/login', { email, contrasena: password });
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setAccessToken(accessToken);
    };

    const register = async (data: RegisterData) => {
        const telefonoCompleto = `11${data.telefono}`;
        await axiosInstance.post('/auth/register', {
            ...data,
            telefono: telefonoCompleto,
            estado: 'ACTIVO'
        });
    };

    const logout = () => {
        localStorage.clear();
        setAccessToken(null);
        window.location.href = '/login';
    };

    const refreshToken = async (): Promise<string | null> => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return null;
        const res = await axiosInstance.post('/auth/refresh', { refreshToken });
        const newToken = res.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        setAccessToken(newToken);
        return newToken;
    };

    useEffect(() => {
        setupAuthInterceptor(() => accessToken, refreshToken);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
