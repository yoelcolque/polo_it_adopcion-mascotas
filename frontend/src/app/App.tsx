/// <reference types="react" />

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import UsersPage from '../features/users/pages/UsersPage';
import { useAuth } from '../features/auth/context/AuthProvider';
import type { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode })  => {
    const { accessToken } = useAuth();
    return accessToken ? children : <Navigate to="/login" />;
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        </Routes>
    </Router>
);

export default App;
