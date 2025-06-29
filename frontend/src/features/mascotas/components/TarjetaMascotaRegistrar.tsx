import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';
import { obtenerGeocodificacionLimpia } from '../../../shared/api/geocodingLimpio';

const TarjetaMascotaRegistrar = ({ mascotaId }: { mascotaId?: string }) => {
    const [imagenPreview, setImagenPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        nombre: '', especie: '', sexo: '', edad: '', descripcion: '',
        imagen: null as File | null,
        calle: '', barrio: '', ciudad: '', pais: 'Argentina',
        historial_medico: '', necesidades: '', peso: '', pelaje: '',
        esterilizado: false, vacunado: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (mascotaId) {
            axiosInstance.get(`/mascota/${mascotaId}`)
                .then(res => {
                    const mascota = res.data?.mascota;
                    if (!mascota) return;
                    const {
                        nombre, especieMascota, sexoMascota, edad,
                        temperamento, imagen,
                        historial_medico, necesidades, peso,
                        pelaje, esterilizado, vacunado
                    } = mascota;

                    setForm(prev => ({
                        ...prev,
                        nombre: nombre || '', especie: especieMascota || '',
                        sexo: sexoMascota || '',
                        edad: typeof edad === 'number' ? edad.toString() : '',
                        descripcion: temperamento || '', imagen: null,
                        historial_medico: historial_medico || '',
                        necesidades: necesidades || '',
                        peso: peso?.toString() || '', pelaje: pelaje || '',
                        esterilizado: !!esterilizado, vacunado: !!vacunado,
                    }));
                    setImagenPreview(imagen || null);
                })
                .catch(() => alert('Error al obtener datos de la mascota.'));
        }
    }, [mascotaId]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        if (name === 'descripcion' && value.length > 255) {
            setError('La descripción no puede exceder los 255 caracteres.');
            return;
        }
        setError(null);
        setForm(prev => ({ ...prev, [name]: val }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm(prev => ({ ...prev, imagen: file }));
        if (file) setImagenPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (form.descripcion.length > 255) {
            setError('La descripción no puede exceder los 255 caracteres.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nombre', form.nombre);
            formData.append('edad', form.edad);
            formData.append('especieMascota', form.especie.toUpperCase());
            formData.append('sexoMascota', form.sexo.toUpperCase());
            formData.append('temperamento', form.descripcion);
            formData.append('historial_medico', form.historial_medico);
            formData.append('necesidades', form.necesidades);
            formData.append('peso', form.peso);
            formData.append('pelaje', form.pelaje);
            formData.append('esterilizado', form.esterilizado.toString());
            formData.append('vacunado', form.vacunado.toString());

            if (form.imagen) formData.append('imagen', form.imagen);

            if (mascotaId) {
                await axiosInstance.put(`/mascota/editar/${mascotaId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                const geo = await obtenerGeocodificacionLimpia(
                    `${form.calle}, ${form.barrio}, ${form.ciudad}, ${form.pais}`
                );
                formData.append('ubicacionTexto', geo.direccion);
                formData.append('latitud', geo.latitud.toString());
                formData.append('longitud', geo.longitud.toString());

                await axiosInstance.post('/mascota/agregar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            navigate('/home');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Ocurrió un error al guardar la mascota.';
            setError(errorMessage);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{error}</div>
            )}

            {/* Imagen */}
            <div className="flex justify-center">
                <label htmlFor="imagen" className="w-32 h-32 border-2 border-[#096A7F] bg-gray-100 flex flex-col items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 overflow-hidden">
                    {form.imagen
                        ? <img src={URL.createObjectURL(form.imagen)} className="w-full h-full object-cover" />
                        : imagenPreview
                            ? <img src={imagenPreview} className="w-full h-full object-cover" />
                            : <span className="text-sm text-[#096A7F]">Subir imagen</span>
                    }
                </label>
                <input id="imagen" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            {/* Campos básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['Nombre', 'nombre'], ['Edad', 'edad'], ['Calle', 'calle'], ['Barrio', 'barrio'], ['Ciudad', 'ciudad'], ['País', 'pais']].map(([label, name]) => (
                    <div key={name} className="relative">
                        <label htmlFor={name} className="absolute -top-2 left-3 px-1 bg-white text-sm text-[#02191E]">{label}</label>
                        <input
                            id={name} name={name} value={(form as any)[name]}
                            onChange={handleChange} placeholder={`Ingresá ${label.toLowerCase()}`}
                            className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm"
                        />
                    </div>
                ))}
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[['Especie', 'especie', ['', 'PERRO', 'GATO']], ['Sexo', 'sexo', ['', 'MACHO', 'HEMBRA']]].map(([label, name, options]: any) => (
                    <div key={name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                        <select name={name} value={(form as any)[name]} onChange={handleChange} className="w-full border border-[#E8672D] rounded-md px-3 py-2">
                            {options.map((opt: string) => (
                                <option key={opt} value={opt}>{opt ? opt.charAt(0) + opt.slice(1).toLowerCase() : `Seleccioná ${label.toLowerCase()}`}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} maxLength={255} className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm" placeholder="Ingresá una descripción" />
                <p className="text-sm text-gray-500">Caracteres: {form.descripcion.length}/255</p>
            </div>

            {/* Campos adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['Historial Médico', 'historial_medico'], ['Necesidades', 'necesidades']].map(([label, name]) => (
                    <div key={name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                        <textarea name={name} value={(form as any)[name]} onChange={handleChange} rows={2} className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm" placeholder={label} />
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Peso (kg)</label>
                    <input name="peso" type="number" value={form.peso} onChange={handleChange} min={0} step="0.1" className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pelaje</label>
                    <input name="pelaje" type="text" value={form.pelaje} onChange={handleChange} className="w-full border border-[#E8672D] rounded-md px-3 py-2 text-sm" />
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="esterilizado" checked={form.esterilizado} onChange={handleChange} />
                    <label className="text-sm text-gray-700">Esterilizado</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="vacunado" checked={form.vacunado} onChange={handleChange} />
                    <label className="text-sm text-gray-700">Vacunado</label>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button onClick={handleSubmit} className="px-8 py-2 rounded-full bg-[#006775] text-white font-semibold hover:bg-[#004f5a]">
                    {mascotaId ? 'Actualizar mascota' : 'Registrar mascota'}
                </button>
            </div>
        </div>
    );
};

export default TarjetaMascotaRegistrar;
