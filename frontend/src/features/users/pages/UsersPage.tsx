import { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/api/axios';

const UsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get('/usuarios/');
            setUsers(res.data);
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {/* Hero con imagen de fondo y título encima */}
            <section>
                <div>
                    <img src="/banner-mascotas.jpg" alt="Imagen emocional" />
                    <h1>Mascotas esperando un hogar</h1>
                </div>
            </section>

            {/*  Sección principal */}
            <main>
                <h2>Mascotas registradas</h2>

                {/*  Tarjetas horizontales */}
                <div>
                    {users.length === 0 ? (
                        <p>No hay mascotas cargadas aún.</p>
                    ) : (
                        <ul>
                            {users.map((u, i) => (
                                <li key={i}>
                                    <div>
                                        <img src={u.imagenUrl || '/placeholder.jpg'} alt={u.nombre} />
                                        <div>
                                            <h3>{u.nombre}</h3>
                                            <button>Editar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UsersPage;
