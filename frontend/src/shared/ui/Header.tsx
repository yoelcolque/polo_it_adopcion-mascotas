import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';

const Header = () => {
    const { logout } = useAuth();

    return (
        <header className="bg-surface shadow-md py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <span className="text-xl font-heading text-primary">Adopta con Amor</span>
            </div>

            <nav className="flex gap-4 text-sm font-semibold text-muted">
                <Link to="/">Inicio</Link>
                <Link to="/buscar">Buscar Mascota</Link>
                <Link to="/deseados">Deseados</Link>
                <Link to="/registrar">Registrar</Link>
                <Link to="/perfil">Perfil</Link>
                <button onClick={logout} className="text-error hover:underline">
                    Cerrar sesión
                </button>
            </nav>
        </header>
    );
};

export default Header;
