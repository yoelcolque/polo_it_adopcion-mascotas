import { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/api/axios';
import { useAuth } from '../../auth/context/AuthProvider';

const UsersPage = () => {
    const { logout } = useAuth();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        const res = await axiosInstance.get('/usuarios/');
        setUsers(res.data);
    };

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map((u, i) => (
                    <li key={i}>{u.nombre} {u.apellido}</li>
                ))}
            </ul>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
};

export default UsersPage;
