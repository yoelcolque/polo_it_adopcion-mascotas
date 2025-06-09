import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import InputWithIcon from '../../../components/InputWithIcon';
import BaseButton from  '../../../components/BaseButton';

const RegisterPage = () => {
    const {register} = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '', apellido: '', telefono: '', email: '',
        contrasena: '', confirmar: '', calle: '', fechaNacimiento: '',
        distrito: '', imagen: null as File | null,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, files} = e.target;
        if (name === 'imagen' && files) {
            setForm(prev => ({...prev, imagen: files[0]}));
        } else {
            setForm(prev => ({...prev, [name]: value}));
        }
    };

    const calcularEdad = (fechaNacimiento: string) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
        return edad;
    };

    const handleSubmit = async () => {
        const {
            nombre,
            apellido,
            telefono,
            email,
            contrasena,
            confirmar,
            calle,
            distrito,
            imagen,
            fechaNacimiento
        } = form;
        const edadNum = calcularEdad(fechaNacimiento);

        if (isNaN(edadNum) || edadNum < 18) {
            setError('Debes tener al menos 18 años para registrarte');
            return;
        }

        if (!nombre || !apellido || !telefono || !email || !contrasena || !confirmar || !calle || !fechaNacimiento || !distrito || !imagen) {
            setError('Completa todos los campos, incluyendo calle, distrito e imagen');
            return;
        }

        if (contrasena !== confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (!/^\d{8}$/.test(telefono)) {
            setError('El teléfono debe tener exactamente 8 dígitos (sin el 11)');
            return;
        }

        try {
            await register({...form, edad: edadNum} as any);
            setSuccess('Usuario registrado con éxito');
            setError('');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registro fallido');
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            {/* header */}
            <div className="mb-10 h-[100px] bg-[#096A7F] text-white shadow-md flex items-center justify-center">
                <h1 className="text-3xl font-bold">Registro</h1>
            </div>

            {/* container princialr */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6">

                {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center">{success}</div>}

                {/* imagen de perfil */}
                <div className="flex justify-center">
                    <label
                        htmlFor="imagen"
                        className="w-32 h-32 border-2 border-[#096A7F] bg-gray-100 flex flex-col items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 transition overflow-hidden"
                    >
                        {form.imagen ? (
                            <img
                                src={URL.createObjectURL(form.imagen)}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-[#096A7F] mb-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                                </svg>
                                <span className="text-xs text-[#096A7F] font-semibold">Subir foto</span>
                            </>
                        )}
                    </label>
                    <input
                        id="imagen"
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>

                <p className="text-xs text-gray-500 text-center -mt-3">
                    Esta imagen se mostrará en tu perfil (máx. 10 MB)
                </p>

                {/* inputss */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">

                <InputWithIcon
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        placeholder="Ingresá tu nombre"
                        iconSrc="/User.svg"
                        value={form.nombre}
                        onChange={handleChange}
                    />
                    <InputWithIcon
                        id="apellido"
                        name="apellido"
                        label="Apellido"
                        placeholder="Ingresá tu apellido"
                        iconSrc="/User.svg"
                        value={form.apellido}
                        onChange={handleChange}
                    />
                    <InputWithIcon
                        id="email"
                        name="email"
                        label="Correo electrónico"
                        placeholder="Ingresá tu correo electrónico"
                        iconSrc="/letter.svg"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <InputWithIcon
                        id="contrasena"
                        name="contrasena"
                        label="Contraseña"
                        placeholder="Ingresá tu contraseña"
                        type="password"
                        iconSrc="/Password.svg"
                        value={form.contrasena}
                        onChange={handleChange}
                    />
                    <InputWithIcon
                        id="confirmar"
                        name="confirmar"
                        label="Confirmar contraseña"
                        placeholder="Repetí tu contraseña"
                        type="password"
                        iconSrc="/Password.svg"
                        value={form.confirmar}
                        onChange={handleChange}
                    />
                    {/* telefono (posdata: lo debemos sacar no?) */}
                    <div className="relative w-[329px] mb-5">
                        <label className="absolute -top-2 left-3 px-1 bg-white text-sm text-[#02191E] z-10">
                            Teléfono
                        </label>
                        <div className="flex items-center h-[60px] border border-[#E8672D] rounded-md px-3 py-2">
                            {/* Ícono */}
                            <img src="/Password.svg" alt="icon" className="w-5 h-5 mr-2" />
                            {/* Prefijo 11 */}
                            <span className="text-sm text-gray-600 mr-2 select-none">11</span>
                            {/* Input */}
                            <input
                                id="telefono"
                                type="text"
                                name="telefono"
                                placeholder="8 dígitos restantes"
                                value={form.telefono}
                                onChange={handleChange}
                                maxLength={8}
                                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <InputWithIcon
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        label="Fecha de nacimiento"
                        placeholder="dd / mm / aaaa"
                        type="date"
                        iconSrc="/Password.svg"
                        value={form.fechaNacimiento}
                        onChange={handleChange}
                    />

                    <InputWithIcon
                        id="calle"
                        name="calle"
                        label="Calle"
                        placeholder="Ingresá tu calle"
                        iconSrc="/location.svg"
                        value={form.calle}
                        onChange={handleChange}
                    />
                    <InputWithIcon
                        id="distrito"
                        name="distrito"
                        label="Distrito"
                        placeholder="Ingresá tu distrito"
                        iconSrc="/location.svg"
                        value={form.distrito}
                        onChange={handleChange}
                    />
                </div>

                {/* Botón */}
                <div className="flex justify-center mt-6">
                    <BaseButton
                        label="Registrarse"
                        onClick={handleSubmit}
                        className="rounded-full bg-[#006775] text-white px-8 py-2 hover:bg-[#004f5a] transition"
                    />
                </div>

                {/* Link login */}
                <div className="flex justify-center items-center mt-4 gap-2 text-sm pb-7">
                    <span className="text-[#444]">¿Ya tenés cuenta?</span>
                    <button
                        className="flex items-center font-semibold text-[#096A7F]"
                        onClick={() => navigate('/login')}
                    >
                        Iniciá sesión
                        <img src="/Arrow-right.svg" alt="Flecha" className="ml-1 w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );

}
export default RegisterPage;
