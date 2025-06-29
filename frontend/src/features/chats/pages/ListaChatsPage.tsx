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
    if (!user?.email) {
      setLoading(false);
      setError("No estás autenticado. Por favor, iniciá sesión.");
      navigate('/login');
      return;
    }

    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/chat/mis-chats");
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

    fetchChats();
  }, [user, navigate]);

  const handleEntrarChat = (chat: ChatDTO) => {
    navigate(`/chat/${chat.id}`, { state: { chat } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-lg">Cargando chats...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Mis Chats</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {!error && chats.length === 0 && (
        <p className="text-gray-600 text-center">No tenés chats iniciados todavía.</p>
      )}

      <ul className="space-y-5">
        {chats.map((chat) => {
          const interlocutorEmail = chat.adoptante.email === user?.email
            ? chat.dueno.email
            : chat.adoptante.email;

          return (
            <li
              key={chat.id}
              className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
            >
              {/* Imagen mascota */}
              <img
                src={chat.mascota.imagen || "/placeholder.png"}
                alt={`Imagen de ${chat.mascota.nombre}`}
                className="w-20 h-20 rounded-lg object-cover mr-5 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  Chat sobre: <span className="text-primary">{chat.mascota.nombre}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  Mascota: {chat.mascota.especieMascota}
                </p>
                <p className="text-sm text-gray-600 mt-2 truncate">
                  Conversación con: <span className="font-medium">{interlocutorEmail}</span>
                </p>
              </div>

              <button
                onClick={() => handleEntrarChat(chat)}
                className="bg-primary hover:bg-primaryDark text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-colors ml-5 flex-shrink-0"
                aria-label={`Entrar al chat sobre ${chat.mascota.nombre}`}
              >
                Entrar
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaChatsPage;
