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
        <div>
            <h2>Registro</h2>
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
            <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
            <input name="telefono" placeholder="Teléfono (8 dígitos)" value={form.telefono} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="contrasena" placeholder="Contraseña" type="password" value={form.contrasena} onChange={handleChange} />
            <input name="confirmar" placeholder="Confirmar contraseña" type="password" value={form.confirmar} onChange={handleChange} />
            <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
            <button onClick={handleSubmit}>Registrarse</button>
            {error && <div>{error}</div>}
            {success && <div>{success}</div>}
            <p><Link to="/login">¿Ya tenés cuenta?</Link></p>
        </div>
    );
};

export default RegisterPage;