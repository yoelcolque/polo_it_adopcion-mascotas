/// <reference types="react" />

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import UsersPage from '../features/users/pages/UsersPage';
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
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private layout with header */}
            <Route element={<LayoutWithHeader />}>
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <UsersPage />
                        </PrivateRoute>
                    }
                />

                <Route path="/homes" element={<UsersPage/>} />
                {/* más rutas aquí con header si querés */}
            </Route>
        </Routes>
    </Router>
);

export default App;
