import TarjetaMascota from '../components/TarjetaMascota.tsx';

const mascotasDeseadas = [
    {
        id: 1,
        nombre: 'Firu',
        especie: 'Perro',
        edad: '2 años',
        descripcion: 'Un cachorro juguetón que ama correr y abrazar.',
        imagenUrl: '', // vacío para simular sin imagen
        contactoUrl: '/perfil/1',
    },
    {
        id: 2,
        nombre: 'Mishita',
        especie: 'Gato',
        edad: '1 año',
        descripcion: 'Muy tranquila y ama dormir cerca de la ventana.',
        imagenUrl: '/img/mishita.png',
        contactoUrl: '/perfil/2',
    }
];

const DeseadosPage = () => (
    <div className="p-6 bg-background min-h-screen font-sans">
        <h1 className="text-3xl font-heading text-text mb-8">Mascotas deseadas</h1>
        <div className="space-y-6">
            {mascotasDeseadas.map(m => (
                <TarjetaMascota key={m.id} mascota={m} />
            ))}
        </div>
    </div>
);

export default DeseadosPage;
