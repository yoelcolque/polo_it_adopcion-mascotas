import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';
import { obtenerGeocodificacionLimpia } from '../../../shared/api/geocodingLimpio';

type Props = {
    mascotaId?: string;
};

const TarjetaMascotaRegistrar = ({ mascotaId }: Props) => {
    const [imagenPreview, setImagenPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    const [form, setForm] = useState({
        nombre: '',
        especie: '',
        sexo: '',
        edad: '',
        descripcion: '',
        imagen: null as File | null,
        calle: '',
        numero: '',
        barrio: '',
        ciudad: '',
        pais: 'Argentina',
    });

    const navigate = useNavigate();

    // Cargar datos si es edición
    useEffect(() => {
        if (mascotaId) {
            axiosInstance.get(`/mascota/${mascotaId}`)
                .then(res => {
                    const mascota = res.data?.mascota;
                    if (!mascota) return;

                    const {
                        nombre,
                        especieMascota,
                        sexoMascota,
                        edad,
                        temperamento,
                        imagen
                    } = mascota;

                    setForm(prev => ({
                        ...prev,
                        nombre: nombre || '',
                        especie: especieMascota || '',
                        sexo: sexoMascota || '',
                        edad: typeof edad === 'number' ? edad.toString() : '',
                        descripcion: temperamento || '',
                        imagen: null,
                    }));
                    setImagenPreview(imagen || null);
                })
                .catch(err => {
                    console.error('Error al cargar la mascota:', err);
                    alert('Error al obtener datos de la mascota.');
                });
        }
    }, [mascotaId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'descripcion' && value.length > 255) {
            setError('La descripción no puede exceder los 255 caracteres.');
            return;
        }
        setError(null); // Limpiar error si es válido
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm(prev => ({ ...prev, imagen: file }));
        if (file) {
            setImagenPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        // Validar longitud de descripción antes de enviar
        if (form.descripcion.length > 255) {
            setError('La descripción no puede exceder los 255 caracteres.');
            return;
        }

        try {
            if (mascotaId) {
                const formData = new FormData();
                formData.append('nombre', form.nombre);
                formData.append('edad', form.edad);
                formData.append('especieMascota', form.especie.toUpperCase());
                formData.append('sexoMascota', form.sexo.toUpperCase());
                formData.append('temperamento', form.descripcion);
                if (form.imagen) {
                    formData.append('imagen', form.imagen);
                }

                await axiosInstance.put(`/mascota/editar/${mascotaId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                const direccionCompleta = `${form.calle} ${form.numero}, ${form.barrio}, ${form.ciudad}, ${form.pais}`;
                const geo = await obtenerGeocodificacionLimpia(direccionCompleta);

                const formData = new FormData();
                formData.append('nombre', form.nombre);
                formData.append('edad', form.edad);
                formData.append('especieMascota', form.especie.toUpperCase());
                formData.append('sexoMascota', form.sexo.toUpperCase());
                formData.append('temperamento', form.descripcion);
                formData.append('ubicacionTexto', geo.direccion);
                formData.append('latitud', geo.latitud.toString());
                formData.append('longitud', geo.longitud.toString());

                if (form.imagen) {
                    formData.append('imagen', form.imagen);
                }

                await axiosInstance.post('/mascota/agregar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            navigate('/home');
        } catch (error: any) {
            console.error('Error al guardar:', error);
            const errorMessage = error.response?.data?.message || 'Ocurrió un error al guardar la mascota.';
            setError(errorMessage);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-6">
            {/* Mensaje de error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                    {error}
                </div>
            )}

            {/* Imagen */}
            <div className="flex justify-center">
                <label
                    htmlFor="imagen"
                    className="w-32 h-32 border-2 border-[#096A7F] bg-gray-100 flex flex-col items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 transition overflow-hidden"
                >
                    {form.imagen ? (
                        <img
                            src={URL.createObjectURL(form.imagen)}
                            alt="Previsualización"
                            className="w-full h-full object-cover"
                        />
                    ) : imagenPreview ? (
                        <img src={imagenPreview} alt="Imagen actual" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-[#096A7F] mb-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                            </svg>
                            <span className="text-xs text-[#096A7F] font-semibold">Subir imagen</span>
                        </>
                    )}
                </label>
                <input
                    id="imagen"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Campos con íconos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: 'Nombre', name: 'nombre', type: 'text' },
                    { label: 'Edad', name: 'edad', type: 'number', min: 0, max: 25 },
                    { label: 'Calle', name: 'calle', type: 'text' },
                    { label: 'Número', name: 'numero', type: 'text' },
                    { label: 'Barrio', name: 'barrio', type: 'text' },
                    { label: 'Ciudad', name: 'ciudad', type: 'text' },
                    { label: 'País', name: 'pais', type: 'text' },
                ].map(({ label, name, type = 'text', min, max }, idx) => (
                    <div key={idx} className="relative w-full">
                        <label
                            htmlFor={name}
                            className="absolute -top-2 left-3 px-1 bg-white text-sm text-[#02191E] z-10"
                        >
                            {label}
                        </label>
                        <div className="flex items-center h-[60px] border border-[#E8672D] rounded-md px-3 py-2">
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={(form as any)[name]}
                                onChange={handleChange}
                                placeholder={`Ingresá ${label.toLowerCase()}`}
                                min={min}
                                max={max}
                                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Especie', name: 'especie', options: ['', 'PERRO', 'GATO'] },
                    { label: 'Sexo', name: 'sexo', options: ['', 'MACHO', 'HEMBRA'] }
                ].map(({ label, name, options }, i) => (
                    <div key={i}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                        <select
                            name={name}
                            value={(form as any)[name]}
                            onChange={handleChange}
                            className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#096A7F]"
                        >
                            {options.map((option, j) => (
                                <option key={j} value={option}>
                                    {option === ''
                                        ? `Seleccioná ${label.toLowerCase()}`
                                        : option.charAt(0) + option.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={3}
                    maxLength={255} // Limita la entrada a 255 caracteres
                    className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#096A7F]"
                    placeholder="Ingresá una descripción (máximo 255 caracteres)"
                />
                <p className="text-sm text-gray-500 mt-1">
                    Caracteres: {form.descripcion.length}/255
                </p>
            </div>

            {/* Botón submit */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleSubmit}
                    className="px-8 py-2 rounded-full bg-[#006775] text-white font-semibold hover:bg-[#004f5a] transition"
                >
                    {mascotaId ? 'Actualizar mascota' : 'Registrar mascota'}
                </button>
            </div>
        </div>
    );
};

export default TarjetaMascotaRegistrar;