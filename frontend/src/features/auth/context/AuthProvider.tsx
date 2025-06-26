import { createContext, useContext, useState, useEffect } from 'react';
import { setupAuthInterceptor } from '../../../shared/api/authInterceptor';
import axiosInstance from '../../../shared/api/axios';
import { jwtDecode } from 'jwt-decode';export interface RegisterData {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    contrasena: string;
    confirmar: string;
    calle: string;
    distrito: string;
    edad: number;
    imagen: File;
}interface DecodedToken {
    sub: string; // Email del usuario
    exp: number;
}interface User {
    email: string; // Solo usamos email
}interface AuthContextType {
    accessToken: string | null;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: RegisterData) => Promise<void>;
}const AuthContext = createContext<AuthContextType>({} as AuthContextType);export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [user, setUser] = useState<User | null>(null);

useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('AccessToken:', token);
    if (token) {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            console.log('Token decodificado:', decoded);
            setUser({
                email: decoded.sub, // Usamos sub como email
            });
        } catch (error) {
            console.error('Error al decodificar token:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAccessToken(null);
            setUser(null);
        }
    } else {
        setUser(null);
    }
}, [accessToken]);

const login = async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', { email, contrasena: password });
    const { accessToken, refreshToken } = res.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);

    const decoded = jwtDecode<DecodedToken>(accessToken);
    setUser({
        email: decoded.sub,
    });
};

const register = async (data: RegisterData) => {
    const telefonoCompleto = `11${data.telefono}`;
    const formData = new FormData();

    formData.append('nombre', data.nombre);
    formData.append('apellido', data.apellido);
    formData.append('telefono', telefonoCompleto);
    formData.append('email', data.email);
    formData.append('contrasena', data.contrasena);
    formData.append('confirmar', data.confirmar);
    formData.append('calle', data.calle);
    formData.append('distrito', data.distrito);
    formData.append('edad', data.edad.toString());
    formData.append('imagen', data.imagen);

    await axiosInstance.post('/auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setUser(null);
    window.location.href = '/login';
};

const refreshToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
    const res = await axiosInstance.post('/auth/refresh', { refreshToken });
    const newToken = res.data.token; // Ajustado según tu Response
    localStorage.setItem('accessToken', newToken);
    setAccessToken(newToken);
    return newToken;
};

useEffect(() => {
    setupAuthInterceptor(() => accessToken, refreshToken);
}, [accessToken]);

return (
    <AuthContext.Provider value={{ accessToken, login, logout, register, user }}>
        {children}
    </AuthContext.Provider>
);

};export const useAuth = () => useContext(AuthContext);

