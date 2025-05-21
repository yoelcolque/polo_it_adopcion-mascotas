const TarjetaMascotaResumen = ({ mascota, onEditar }: { mascota: any; onEditar: () => void }) => {
    return (
        <div className="flex items-center gap-4 bg-surface p-4 rounded-xl shadow-sm">
            <img
                src={mascota.imagenUrl || '/placeholder.jpg'}
                alt={mascota.nombre}
                className="w-24 h-24 object-cover rounded-full border"
            />

            <div className="flex-1">
                <h3 className="text-xl font-heading text-text">{mascota.nombre}</h3>
                <p className="text-sm text-muted">{mascota.descripcion}</p>
            </div>

            <button
                onClick={onEditar}
                className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-md"
            >
                Editar
            </button>
        </div>
    );
};

export default TarjetaMascotaResumen;
