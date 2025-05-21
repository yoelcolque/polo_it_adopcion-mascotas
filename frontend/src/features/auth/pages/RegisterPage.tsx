import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '', apellido: '', telefono: '', email: '', contrasena: '', confirmar: '', direccion: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { nombre, apellido, telefono, email, contrasena, confirmar, direccion } = form;
        if (!nombre || !apellido || !telefono || !email || !contrasena || !confirmar || !direccion) {
            setError('Completa todos los campos');
            return;
        }
        if (contrasena !== confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            await register(form);
            setSuccess('Usuario registrado con éxito');
            setError('');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registro fallido');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-center text-text mb-6">Registro</h2>

                {error && <div className="text-error text-center mb-4">{error}</div>}
                {success && <div className="text-green-600 text-center mb-4">{success}</div>}

                <input
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="apellido"
                    placeholder="Apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="telefono"
                    placeholder="Teléfono (8 dígitos)"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="contrasena"
                    type="password"
                    placeholder="Contraseña"
                    value={form.contrasena}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="confirmar"
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={form.confirmar}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="direccion"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-primaryDark transition-colors duration-300"
                >
                    Registrarse
                </button>

                <p className="mt-4 text-center text-sm text-muted">
                    ¿Ya tenés cuenta?
                    <Link to="/login" className="text-primary hover:underline ml-1">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );

};

export default RegisterPage;