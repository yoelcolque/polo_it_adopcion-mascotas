import { useNavigate } from 'react-router-dom';
import BaseButton from '../../../components/BaseButton';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#096A7F] px-6">
            <img
                src="/icon_markplace.svg"
                alt="Logo Pet Marketplace"
                className="w-[216px] h-[194px] mb-0"
            />
            <h1 className="text-xl font-medium mb-8">Siempre a tu lado</h1>

            <BaseButton label="Busco Mascota" onClick={() => navigate('/home')} className="mb-3" />
            <BaseButton label="Ofrezco Mascota" onClick={() => navigate('/register')} variant="outlined" className="mb-6" />

            <div className="flex items-center gap-2 text-sm">
                <span className="text-[#555]">¿Ya tenés cuenta?</span>
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center font-semibold text-[#096A7F]"
                >
                    Iniciá sesión
                    <img src="/Arrow-right.svg" alt="Flecha" className="ml-1 w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default HomePage;