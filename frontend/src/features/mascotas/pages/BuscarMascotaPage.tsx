import Buscador from '../components/Buscador';
import FiltrosMascota from '../components/FiltrosMascota';
import MapaUbicacion from '../components/MapaUbicacion';

const BuscarMascotaPage = () => {
    return (
        <div className="min-h-screen bg-background font-sans">

            <main className="grid grid-cols-3 grid-rows-[auto_1fr] gap-4 p-4"
                  style={{ gridTemplateAreas: `'buscador buscador buscador' 'filtros mapa mapa'` }}>

                {/* Buscador */}
                <section className="col-span-3" style={{ gridArea: 'buscador' }}>
                    <Buscador />
                </section>

                {/* Filtros */}
                <aside className="row-span-2" style={{ gridArea: 'filtros' }}>
                    <FiltrosMascota />
                </aside>

                {/* Mapa + puntos de ubicación */}
                <section className="col-span-2 row-span-2" style={{ gridArea: 'mapa' }}>
                    <MapaUbicacion />
                </section>

            </main>
        </div>
    );
};

export default BuscarMascotaPage;
