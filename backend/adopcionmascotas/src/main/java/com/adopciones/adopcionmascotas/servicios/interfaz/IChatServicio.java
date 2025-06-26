package com.adopciones.adopcionmascotas.servicios.interfaz;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Usuario;

public interface IChatServicio {

	Response obtenerOCrearChatRoom(Usuario adoptante, Usuario dueno, Mascota mascota);
	
	Response obtenerChatsDelUsuario(Usuario currentUser);

	Response enviarMensaje(Chat chat, Usuario emisor, Usuario receptor, String contenido);
	
	Response obtenerMensajes(Chat chat);
}
