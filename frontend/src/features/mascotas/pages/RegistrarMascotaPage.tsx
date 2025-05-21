import TarjetaMascotaRegistrar from '../components/TarjetaMascotaRegistrar.tsx';

const RegistrarMascotaPage = () => {
    return (
        <div className="min-h-screen bg-background p-6 font-sans">
            <h1 className="text-3xl font-heading text-text mb-6">Registrar nueva mascota</h1>
            <TarjetaMascotaRegistrar />
        </div>
    );
};

export default RegistrarMascotaPage;
