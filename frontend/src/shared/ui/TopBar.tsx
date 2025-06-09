import { useLocation, useNavigate } from 'react-router-dom';

const TITULOS: Record<string, string> = {
    '/home': 'Home',
    '/registrar': 'Registrar',
    '/deseados': 'Deseados',
    '/buscar': 'Buscar',
    '/perfil': 'Perfil',
    '/chat': 'Chat',
};

const TopBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const titulo = TITULOS[pathname] ?? '';

    return (
        <header className="md:hidden fixed top-0 left-0 w-full h-[70px] bg-[#006775] shadow z-50 flex items-center justify-center px-4">
            {/* flecha atras (posdta: solo funciona en los movles)*/}
            <button
                onClick={() => navigate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2"
            >
                <img src="/flech_line.svg" alt="Volver" className="h-12 w-12" />
            </button>

            <h1 className="text-white text-2xl font-semibold">{titulo}</h1>
        </header>
    );
};

export default TopBar;
