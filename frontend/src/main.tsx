import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { AuthProvider } from './features/auth/context/AuthProvider';
import './styles/tailwind.css';
import InitialLoader from './features/auth/components/InitialLoader';

const Root = () => {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        //!!!!!IMPOR!!!!!  aqui manejo el tiempo de animacion del loading, puse 5000 aunque veo que es demaciado
        const timeout = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <React.StrictMode>
            {loading ? (
                <InitialLoader />
            ) : (
                <AuthProvider>
                    <App />
                </AuthProvider>
            )}
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
