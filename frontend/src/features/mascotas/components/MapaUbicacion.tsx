import PuntoUbicacion from './PuntoUbicacion';

const MapaUbicacion = () => (
    <div className="relative w-full h-96 bg-gray-200 rounded">

        <PuntoUbicacion
            top="20%"
            left="30%"
            mascota={{
                nombre: 'Firu',
                imagenUrl: '',
                especie: 'Perro',
                edad: '2 años',
                descripcion: 'Muy activo y cariñoso',
            }}
        />
        <PuntoUbicacion
            top="50%"
            left="60%"
            mascota={{
                nombre: 'Mishita',
                imagenUrl: '/img/mishita.png',
                especie: 'Gato',
                edad: '1 año',
                descripcion: 'Muy tranquila y duerme mucho',
            }}
        />
        <PuntoUbicacion
            top="70%"
            left="40%"
            mascota={{
                nombre: 'Toby',
                imagenUrl: '',
                especie: 'Perro',
                edad: '4 años',
                descripcion: 'Fuerte y protector',
            }}
        />
    </div>
);

export default MapaUbicacion;
