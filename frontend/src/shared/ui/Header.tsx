import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../../features/auth/context/AuthProvider';

const navItems = [
    { to: '/home', icon: '/Home.svg', label: 'Home' },
    { to: '/registrar', icon: '/Edit.svg', label: 'Registrar' },
    { to: '/deseados', icon: '/Heart.svg', label: 'Deseados' },
    { to: '/buscar', icon: '/Search.svg', label: 'Buscar' },
    { to: '/perfil', icon: '/User.svg', label: 'Perfil' },
    { to: '/chat/mis-chats', icon: '/letter.svg', label: 'Chat' },
];

const Header = () => {
    const { pathname } = useLocation();
    const { logout, user } = useAuth();

    return (
        <aside
            className={classNames(
                'bg-[#006775] shadow-md flex items-center justify-around',
                'fixed bottom-0 w-full h-[70px] z-20',
                'md:static md:flex-col md:justify-start md:items-center',
                'md:w-[85px] md:min-h-screen md:h-auto md:py-6'
            )}
        >
            {navItems.map(({ to, icon, label }) => {
                const isActive = pathname === to;

                return (
                    <Link
                        key={to}
                        to={to}
                        className="group flex flex-col items-center sm:flex-col gap-1 relative"
                    >
                        <img
                            src={icon}
                            alt={label}
                            className={classNames(
                                'h-6 w-6 transition-transform duration-200 filter',
                                isActive
                                    ? 'sepia brightness-[1.7] hue-rotate-[10deg] saturate-[1000%] contrast-[190%]'
                                    : 'brightness-150 opacity-70',
                                'group-hover:scale-110'
                            )}
                        />

                        <span
                            className={classNames(
                                'text-xs font-semibold',
                                isActive ? 'text-white' : 'text-white/70',
                                'group-hover:text-white'
                            )}
                        >
                            {label}
                        </span>

                        {isActive && (
                            <div
                                className={classNames(
                                    'w-4 h-1 bg-[#E8672D] rounded-full',
                                    'mt-1',
                                    'sm:mt-1 sm:static'
                                )}
                            />
                        )}
                    </Link>
                );
            })}

            {/* Botón Cerrar sesión, solo si está logueado */}
            {user && (
                <button onClick={logout} className="mb-4 flex flex-col items-center cursor-pointer">
                    <img src="/logout.png" alt="Cerrar sesión" className="h-6 w-6" />
                    <span className="text-xs text-white/70">Salir</span>
                </button>

            )}
        </aside>
    );
};

export default Header;