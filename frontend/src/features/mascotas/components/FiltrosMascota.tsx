const FiltrosMascota = () => (
    <div className="space-y-4">
        <h3 className="font-bold text-lg">Filtrar por:</h3>

        <select className="w-full p-2 border rounded">
            <option>Especie</option>
            <option>Perro</option>
            <option>Gato</option>
        </select>

        <select className="w-full p-2 border rounded">
            <option>Tamaño</option>
            <option>Pequeño</option>
            <option>Mediano</option>
            <option>Grande</option>
        </select>

        <select className="w-full p-2 border rounded">
            <option>Edad</option>
            <option>Cachorro</option>
            <option>Adulto</option>
        </select>
    </div>
);
export default FiltrosMascota;
