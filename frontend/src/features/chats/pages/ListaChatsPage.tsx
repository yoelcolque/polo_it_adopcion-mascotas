import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import axiosInstance from "../../../shared/api/axios";
import axios from "axios";
import type { ChatDTO } from "../types/types";

const ListaChatsPage = () => {
 const { user } = useAuth();
 const navigate = useNavigate();
 const [chats, setChats] = useState<ChatDTO[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 console.log("ListaChatsPage - User:", user);
 const fetchChats = async () => {
 try {
 setLoading(true);
 const url = "/chat/mis-chats";
 console.log("Llamando a la API en:", url);
 const res = await axiosInstance.get(url);
 console.log("Respuesta completa:", res.data);
 console.log("Chats recibidos:", res.data.objeto);
 setChats(res.data.objeto || []);
 setError(null);
 } catch (error) {
 console.error("Error cargando chats:", error);
 if (axios.isAxiosError(error)) {
 setError(error.response?.data.message || "Error al cargar los chats");
 } else {
 setError("Error desconocido al cargar los chats");
 }
 } finally {
 setLoading(false);
 }
 };

 if (user === null) {
 return;
 }

 if (user?.email) {
 fetchChats();
 } else {
 setLoading(false);
 setError("No estás autenticado. Por favor, iniciá sesión.");
 navigate('/login');
 }
 }, [user, navigate]);

 const handleEntrarChat = (chat: ChatDTO) => {
 console.log("Navegando a chat con ID:", chat.id, "Datos del chat:", chat);
 navigate(`/chat/${chat.id}`, { state: { chat } });
 };

 if (loading) {
 return <div className="p-6">Cargando...</div>;
 }

 return (
 <div className="p-6">
 <h2 className="text-xl font-bold mb-4">Mis Chats</h2>
 {error && <p className="text-red-500">{error}</p>}
 {chats.length === 0 && !error ? (
 <p>No tenés chats iniciados todavía.</p>
 ) : (
 <ul className="space-y-4">
 {chats.map((chat) => (
 <li
 key={chat.id}
 className="p-4 bg-white border rounded shadow flex justify-between items-center"
 >
 <div>
 <p className="font-semibold">
 Chat sobre mascota: {chat.mascota.nombre} (ID: {chat.mascota.mascotaId})
 </p>
 <p className="text-sm text-gray-500">
 Con: {chat.adoptante.email === user?.email ? chat.dueno.email : chat.adoptante.email}
 </p>
 </div>
 <button
 onClick={() => handleEntrarChat(chat)}
 className="bg-blue-600 text-white px-4 py-1 rounded"
 >
 Entrar
 </button>
 </li>
 ))}
 </ul>
 )}
 </div>
 );
};

export default ListaChatsPage;