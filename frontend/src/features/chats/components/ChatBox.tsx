import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMensajes, enviarMensaje } from "../services/chatApi";
import type { MensajeDTO, ChatDTO } from "../types/types";
import { useAuth } from "../../auth/context/AuthProvider";

interface ChatBoxProps {
  chatId: number;
  receptorEmail: string;
  chat: ChatDTO;
}

const ChatBox = ({ chatId, receptorEmail, chat }: ChatBoxProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mensajes, setMensajes] = useState<MensajeDTO[]>([]);
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mensajesRef = useRef<HTMLDivElement>(null);

  const cargarMensajes = async () => {
    try {
      setLoading(true);
      const res = await obtenerMensajes(chatId);
      console.log("ChatBox - Respuesta de mensajes:", res);
      setMensajes(res.objeto || []);
      setError(null);
    } catch (error: any) {
      console.error("ChatBox - Error cargando mensajes:", error);
      setError(error.response?.data?.message || "Error al cargar los mensajes");
    } finally {
      setLoading(false);
    }
  };

  const handleEnviar = async () => {
    if (!contenido.trim() || !user) {
      setError("Debes estar autenticado y escribir un mensaje");
      return;
    }

    try {
      setError(null);
      // Determinar emisorId y receptorId desde chat
      const emisorId =
        user.email === chat.adoptante.email
          ? chat.adoptante.usuarioId
          : chat.dueno.usuarioId;
      const receptorId =
        chat.adoptante.email === receptorEmail
          ? chat.adoptante.usuarioId
          : chat.dueno.usuarioId;

      if (!emisorId || !receptorId) {
        throw new Error("No se pudieron determinar los IDs de emisor o receptor");
      }

      const mensajeData = {
        chatId,
        emisorId,
        receptorId,
        contenido,
      };
      console.log("ChatBox - Enviando mensaje:", mensajeData);
      const res = await enviarMensaje(mensajeData);
      console.log("ChatBox - Respuesta de enviar mensaje:", res);
      setContenido("");
      await cargarMensajes();
    } catch (error: any) {
      console.error("ChatBox - Error enviando mensaje:", error);
      setError(error.message || "Error al enviar el mensaje");
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, [chatId]);

  useEffect(() => {
    mensajesRef.current?.scrollTo(0, mensajesRef.current.scrollHeight);
  }, [mensajes]);

  if (loading) {
    return <div className="p-4 text-gray-600">Cargando mensajes...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Encabezado */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Chat sobre {chat.mascota.nombre}
          </h2>
          <p className="text-sm text-gray-500">Con: {receptorEmail}</p>
        </div>
        <button
          onClick={() => navigate("/chat/mis-chats")}
          className="text-blue-600 hover:text-blue-800"
        >
          Volver
        </button>
      </div>

      {/* Área de Mensajes */}
      <div
        ref={mensajesRef}
        className="flex-1 h-96 p-4 overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {error && (
          <p className="text-red-500 text-center mb-2 font-medium">{error}</p>
        )}
        {mensajes.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">
            No hay mensajes todavía. ¡Empezá la conversación!
          </p>
        ) : (
          <div className="space-y-2">
            {mensajes.map((msg, idx) => {
              const isSentByUser = msg.emisorId === (user?.email === chat.adoptante.email ? chat.adoptante.usuarioId : chat.dueno.usuarioId);
              const isSameSenderAsPrevious =
                idx > 0 && mensajes[idx - 1].emisorId === msg.emisorId;
              return (
                <div
                  key={idx}
                  className={`flex ${
                    isSentByUser ? "justify-end" : "justify-start"
                  } ${isSameSenderAsPrevious ? "mt-1" : "mt-3"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 text-sm rounded-xl shadow-sm ${
                      isSentByUser
                        ? "bg-blue-600 text-white rounded-tl-xl rounded-bl-xl rounded-br-sm"
                        : "bg-gray-200 text-gray-900 rounded-tr-xl rounded-br-xl rounded-bl-sm"
                    }`}
                  >
                    {msg.contenido}
                    <p
                      className={`text-xs mt-1 ${
                        isSentByUser ? "text-blue-200" : "text-gray-500"
                      } text-right`}
                    >
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input y Botón */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Escribí tu mensaje..."
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            😊
          </span>
        </div>
        <button
          onClick={handleEnviar}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={!contenido.trim()}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;