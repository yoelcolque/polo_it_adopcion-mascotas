import TarjetaMascota from '../../mascotas/components/TarjetaMascota';


//aca supuse un posible dato mascota
const mascotas = [
    {
        id: 1,
        nombre: 'Firu',
        especie: 'Perro',
        edad: '2 años',
        descripcion: 'Leal y activo. Ideal para niños.',
        imagenUrl: '',
        contactoUrl: '/perfil/1',
    },
    {
        id: 2,
        nombre: 'Mishita',
        especie: 'Gato',
        edad: '3 años',
        descripcion: 'Muy cariñosa y tranquila.',
        imagenUrl: '/img/mishita.png',
        contactoUrl: '/perfil/2',
    },
];

// aca tambien supuse un dato usuario
const usuario = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '12345678',
    imagenUrl: ''
};


const PerfilPage = () => {
    return (
        <div className="min-h-screen p-6 bg-background font-sans">
            <h1 className="text-3xl font-heading text-text mb-6">Mi perfil</h1>

            <div className="grid grid-cols-[150px_1fr_1fr] grid-rows-[auto_auto_auto] gap-4">

                {/* Imagen */}
                <div className="row-span-2 flex justify-center items-center">
                    <img
                        src={usuario.imagenUrl || '/placeholder.png'}
                        alt="Perfil"
                        className="w-28 h-28 rounded-full object-cover border"
                    />
                </div>

                {/* Datos */}
                <div className="col-span-2 flex flex-col gap-2 text-text">
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                </div>

                {/* Mascotas asociadas */}
                <div className="col-span-3 mt-8">
                    <h2 className="text-2xl font-heading mb-4">Mascotas registradas</h2>
                    <div className="space-y-4">
                        {mascotas.map(m => (
                            <TarjetaMascota key={m.id} mascota={m} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilPage;
