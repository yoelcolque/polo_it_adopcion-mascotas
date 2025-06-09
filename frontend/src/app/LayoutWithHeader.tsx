import { Outlet } from 'react-router-dom';
import TopBar from '../shared/ui/TopBar';
import Header from '../shared/ui/Header';

const LayoutWithHeader = () => (
    <div className="flex min-h-screen w-full relative">
        <Header />

        <div className="flex-1 flex flex-col">
            {/* Top bar solo en movil */}
            <TopBar/>
            <div id="map-tooltip-root"
                 className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9999]"></div>

            {/* Contenido debajo del top bar (70px) */}
            <main className="flex-1 bg-background p-1 pt-[70px] pb-[70px] md:pt-4 overflow-y-auto">
                <Outlet/>
            </main>
        </div>
    </div>
);

export default LayoutWithHeader;
