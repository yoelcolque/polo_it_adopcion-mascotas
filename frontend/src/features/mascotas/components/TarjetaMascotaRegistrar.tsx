import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axios';

type Props = {
    mascotaId?: string;
};

const TarjetaMascotaRegistrar = ({ mascotaId }: Props) => {
    const [form, setForm] = useState({
        nombre: '',
        especie: '',  // PERRO / GATO
        sexo: '',     // MACHO / HEMBRA
        edad: '',
        descripcion: '',
        imagen: null as File | null,
    });

    const navigate = useNavigate();

    // Cargar datos si es edición
    useEffect(() => {
        if (mascotaId) {
            axiosInstance.get(`/mascotas/${mascotaId}`)
                .then(res => {
                    const { nombre, especieMascota, sexoMascota, edad, descripcion } = res.data;
                    setForm(prev => ({
                        ...prev,
                        nombre,
                        especie: especieMascota,
                        sexo: sexoMascota,
                        edad: edad.toString(),
                        descripcion,
                        imagen: null,
                    }));
                })

                .catch(err => {
                    console.error('Error al cargar la mascota:', err);
                    alert('Error al obtener datos de la mascota.');
                });
        }
    }, [mascotaId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm(prev => ({ ...prev, imagen: file }));
    };


    // Subida condicional: POST o PUT + redirección
    const handleSubmit = async () => {
        try {
            const mascotaDTO = {
                nombre: form.nombre,
                edad: parseInt(form.edad),
                especieMascota: form.especie.toUpperCase(),
                sexoMascota: form.sexo.toUpperCase(),
                descripcion: form.descripcion,
                // Omitimos imagen porque el backend no la espera aún
            };


            if (mascotaId) {
                await axiosInstance.put(`/mascota/editar/${mascotaId}`, mascotaDTO);
            } else {
                await axiosInstance.post('/mascota/agregar', mascotaDTO);
            }



            navigate('/home');
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Ocurrió un error al guardar la mascota.');
        }
    };

    return (
        <div className="flex gap-4 bg-surface p-6 rounded-xl shadow-md">
            {/* Imagen (visual, no funcional aún) */}
            <div className="w-32 h-32 flex justify-center items-center border rounded-full overflow-hidden bg-muted text-white text-sm">
                {form.imagen ? (
                    <img
                        src={URL.createObjectURL(form.imagen)}
                        alt="Previsualización"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>Sin imagen</span>
                )}
            </div>

            {/* Formulario */}
            <div className="flex-1 space-y-4">
                <div>
                    <label className="block text-sm text-muted mb-1">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm text-muted mb-1">Especie</label>
                    <select
                        name="especie"
                        value={form.especie}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccioná especie</option>
                        <option value="PERRO">Perro</option>
                        <option value="GATO">Gato</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-muted mb-1">Sexo</label>
                    <select
                        name="sexo"
                        value={form.sexo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccioná sexo</option>
                        <option value="MACHO">Macho</option>
                        <option value="HEMBRA">Hembra</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-muted mb-1">Edad</label>
                    <input
                        type="number"
                        name="edad"
                        value={form.edad}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        min={0}
                        max={25}
                    />
                </div>

                <div>
                    <label className="block text-sm text-muted mb-1">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm text-muted mb-1">Imagen</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                        accept="image/*"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-md"
                >
                    {mascotaId ? 'Actualizar' : 'Registrar'}
                </button>
            </div>
        </div>
    );

};

export default TarjetaMascotaRegistrar;
