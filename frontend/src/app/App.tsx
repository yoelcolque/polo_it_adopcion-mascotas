/// <reference types="react" />

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import UsersPage from '../features/users/pages/UsersPage';
import BuscarMascotaPage from '../features/mascotas/pages/BuscarMascotaPage';
import DeseadosPage from '../features/mascotas/pages/DeseadosPage';
import RegistrarMascotaPage from '../features/mascotas/pages/RegistrarMascotaPage';
import EditarMascotaPage from '../features/mascotas/pages/EditarMascotaPage';
import PerfilPage from '../features/users/pages/PerfilPage';
import LayoutWithHeader from './LayoutWithHeader';
import { useAuth } from '../features/auth/context/AuthProvider';
import type { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { accessToken } = useAuth();
    return accessToken ? children : <Navigate to="/login" />;
};

const App = () => (
    <Router>
        <Routes>
            {/* Públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Privadas con layout */}
            <Route element={<LayoutWithHeader />}>
                <Route path="/home" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
                <Route path="/buscar" element={<PrivateRoute><BuscarMascotaPage /></PrivateRoute>} />
                <Route path="/deseados" element={<PrivateRoute><DeseadosPage /></PrivateRoute>} />
                <Route path="/registrar" element={<PrivateRoute><RegistrarMascotaPage /></PrivateRoute>} />
                <Route path="/editar/:id" element={<PrivateRoute><EditarMascotaPage /></PrivateRoute>} />
                <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
            </Route>

            {/* Puse paginas publicas para ver como era el desarrollo, porque las otras necesitan tokens*/}
            <Route path="/homes" element={<UsersPage/>} />
            <Route path="/deseadoss" element={<DeseadosPage/>} />
            <Route path="/registrars" element={<RegistrarMascotaPage/>} />
            <Route path="/buscars" element={<BuscarMascotaPage/>} />
            <Route path="/perfils" element={<PerfilPage/>} />
            <Route path="/editars/:id" element={<EditarMascotaPage/>}/>
        </Routes>
    </Router>
);

export default App;



