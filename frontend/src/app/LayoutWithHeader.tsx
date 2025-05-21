import { Outlet } from 'react-router-dom';
import Header from '../shared/ui/Header';

const LayoutWithHeader = () => (
    <>
        <Header />
        <main className="p-4 bg-background min-h-screen">
            <Outlet />
        </main>
    </>
);

export default LayoutWithHeader;
