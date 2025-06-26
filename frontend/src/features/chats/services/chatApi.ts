import axiosInstance from "../../../shared/api/axios";
import type { ChatDTO, MensajeDTO } from "../types/types";

export const obtenerMensajes = async (chatId: number): Promise<{ objeto: MensajeDTO[] }> => {
  console.log("chatApi - Obteniendo mensajes para chatId:", chatId);
  const res = await axiosInstance.get(`/chat/mensajes/${chatId}`);
  console.log("chatApi - Respuesta de obtenerMensajes:", res.data);
  return res.data;
};

export const enviarMensaje = async (data: {
  chatId: number;
  emisorId: number;
  receptorId: number;
  contenido: string;
}) => {
  console.log("chatApi - Enviando mensaje:", data);
  if (!data.chatId || !data.emisorId || !data.receptorId) {
    throw new Error("chatId, emisorId, y receptorId son requeridos y no pueden ser nulos");
  }
  try {
    const res = await axiosInstance.post("/chat/enviar", {
      chatId: data.chatId,
      emisorId: data.emisorId,
      receptorId: data.receptorId,
      contenido: data.contenido,
    });
    console.log("chatApi - Respuesta de enviarMensaje:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("chatApi - Error en enviarMensaje:", error);
    const errorMsg = error.response?.data?.message || error.message || "Error al enviar el mensaje";
    throw new Error(errorMsg);
  }
};

export const obtenerOCrearChat = async (
  usuario1Email: string,
  usuario2Email: string,
  mascotaId: number
): Promise<{ objeto: ChatDTO }> => {
  console.log("chatApi - Obteniendo o creando chat:", { usuario1Email, usuario2Email, mascotaId });
  try {
    const res = await axiosInstance.get("/chat/obtener-o-crear", {
      params: { duenoEmail: usuario2Email, mascotaId },
    });
    console.log("chatApi - Respuesta de obtenerOCrearChat:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("chatApi - Error en obtenerOCrearChat:", error);
    throw new Error(error.response?.data?.message || "Error al crear el chat");
  }
};