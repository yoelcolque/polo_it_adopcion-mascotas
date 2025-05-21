import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await login(email, password);
            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login fallido');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 font-sans text-text">
            <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-md">
                <h1 className="text-title font-heading text-center mb-6">Iniciar sesión</h1>

                {error && <p className="text-error text-center mb-4 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-primaryDark transition-colors duration-300 text-sm font-semibold"
                >
                    Iniciar sesión
                </button>

                <p className="mt-4 text-center text-sm text-muted">
                    ¿No tenés cuenta?
                    <Link to="/register" className="text-primary hover:underline ml-1">
                        Registrate acá
                    </Link>
                </p>
            </div>
        </div>
    );

};
export default LoginPage;
