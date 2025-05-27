import { useState } from 'react';
import { useMascotas } from '../../../shared/context/MascotasContext';
import { buscarCoordenadas } from '../../../shared/api/geocoding';
import axiosInstance from '../../../shared/api/axios';
import { useMapa } from '../../../shared/context/MapaContext';

const Buscador = () => {
    const [direccion, setDireccion] = useState('');
    const { setMascotas } = useMascotas();
    const { setCoordenadas } = useMapa(); // 🧠 nuevo

    const handleBuscar = async () => {
        try {
            const { lat, lon } = await buscarCoordenadas(direccion);

            const res = await axiosInstance.get('/mascota/cercanas', {
                params: { lat, lon, distanciaKm: 10 },
            });

            setMascotas(res.data.mascotas || []);
            setCoordenadas({ lat, lon }); // 👈 mueve el mapa
        } catch (err) {
            console.error('No se pudo buscar:', err);
        }
    };

    return (
        <div>
            <input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Buscar por dirección..."
                className="w-full p-2 rounded border"
            />
            <button onClick={handleBuscar} className="mt-2 p-2 bg-primary text-white rounded">Buscar</button>
        </div>
    );
};

export default Buscador;