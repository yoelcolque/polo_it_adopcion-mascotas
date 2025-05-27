import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '', apellido: '', telefono: '', email: '',
        contrasena: '', confirmar: '', direccion: '', fechaNacimiento: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { nombre, apellido, telefono, email, contrasena, confirmar, direccion } = form;
        const edadNum = calcularEdad(form.fechaNacimiento);

        if (isNaN(edadNum) || edadNum < 18) {
            setError('Debes tener al menos 18 años para registrarte');
            return;
        }

        if (!nombre || !apellido || !telefono || !email || !contrasena || !confirmar || !direccion || !form.fechaNacimiento) {
            setError('Completa todos los campos');
            return;
        }

        if (contrasena !== confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (!/^\d{8}$/.test(form.telefono)) {
            setError('El teléfono debe tener exactamente 8 dígitos (sin el 11)');
            return;
        }

        try {
            await register({ ...form,edad: edadNum.toString() }); // 👈 ESTA ES LA CLAVE
            setSuccess('Usuario registrado con éxito');
            setError('');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registro fallido');
        }
    };


    const calcularEdad = (fechaNacimiento: string) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
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
                <div className="flex items-center mb-4">
                    <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-600 text-sm select-none">
                        11
                    </span>
                    <input
                        type="text"
                        name="telefono"
                        placeholder="8 dígitos restantes"
                        value={form.telefono}
                        onChange={handleChange}
                        maxLength={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <input
                    name="fechaNacimiento"
                    type="date"
                    value={form.fechaNacimiento}
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