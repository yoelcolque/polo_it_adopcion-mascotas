import { useLocation } from "react-router-dom";
import type { ChatDTO } from "../types/types";
import ChatBox from "../components/ChatBox";
import { useAuth } from "../../auth/context/AuthProvider";

const ChatPage = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const chat = state?.chat as ChatDTO | null;

  console.log("ChatPage - Chat:", chat);
  console.log("ChatPage - User:", user);

  if (!chat || !user) {
    return <div className="p-4">Cargando chat o usuario no autenticado...</div>;
  }

  const receptorEmail = chat.adoptante.email === user.email ? chat.dueno.email : chat.adoptante.email;
  console.log("ChatPage - ReceptorEmail:", receptorEmail);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ChatBox chatId={chat.id} receptorEmail={receptorEmail} chat={chat} />
    </div>
  );
};

export default ChatPage;
