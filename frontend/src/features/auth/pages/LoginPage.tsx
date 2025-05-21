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
        <div>
            <h2>Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
            <button onClick={handleSubmit}>Iniciar sesión</button>
            {error && <div>{error}</div>}
            <p><Link to="/register">¿No tenés cuenta?</Link></p>
        </div>
    );
};

export default LoginPage;
