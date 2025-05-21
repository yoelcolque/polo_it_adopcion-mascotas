import { useParams } from 'react-router-dom';
import TarjetaMascotaRegistrar from '../components/TarjetaMascotaRegistrar';

const EditarMascotaPage = () => {
    const { id } = useParams(); // para buscar datos en el backend

    return (
        <div className="min-h-screen bg-background p-6 font-sans">
            <h1 className="text-3xl font-heading text-text mb-6">Editar mascota</h1>
            <TarjetaMascotaRegistrar mascotaId={id} />
        </div>
    );
};

export default EditarMascotaPage;
