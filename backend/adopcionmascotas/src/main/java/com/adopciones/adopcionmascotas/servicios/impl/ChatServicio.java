package com.adopciones.adopcionmascotas.servicios.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adopciones.adopcionmascotas.dtos.ChatDTO;
import com.adopciones.adopcionmascotas.dtos.MensajeDTO;
import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.excepciones.OurException;
import com.adopciones.adopcionmascotas.mappers.ChatMapper;
import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Mensaje;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.repositorios.ChatRepositorio;
import com.adopciones.adopcionmascotas.repositorios.MensajeRepositorio;
import com.adopciones.adopcionmascotas.servicios.interfaz.IChatServicio;

@Service
public class ChatServicio implements IChatServicio {

    @Autowired
    private ChatRepositorio chatRepositorio;

    @Autowired
    private MensajeRepositorio mensajeRepositorio;

    @Autowired
    private ChatMapper chatMapper;

    @Override
    public Response obtenerOCrearChatRoom(Usuario currentUser, Usuario dueno, Mascota mascota) {
        Response response = new Response();
        try {
            if (currentUser == null) {
                throw new OurException("Usuario no autenticado.");
            }

            Optional<Chat> chatOpt = chatRepositorio.findByAdoptanteAndDuenoAndMascota(currentUser, dueno, mascota);

            Chat chat;
            if (chatOpt.isPresent()) {
                chat = chatOpt.get();
            } else {
                chat = new Chat();
                chat.setAdoptante(currentUser);
                chat.setDueno(dueno);
                chat.setMascota(mascota);
                chat = chatRepositorio.save(chat);
            }

            ChatDTO chatDTO = chatMapper.chatToChatDTO(chat);

            response.setStatusCode(200);
            response.setMessage("Chat room obtenido o creado");
            response.setObjeto(chatDTO);

        } catch (OurException e) {
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al obtener o crear chat: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response obtenerChatsDelUsuario(Usuario currentUser) {
        Response response = new Response();
        try {
            if (currentUser == null) {
                throw new OurException("Usuario no autenticado.");
            }
            System.out.println("Usuario en sesión email: " + currentUser.getEmail());
            List<Chat> chats = chatRepositorio.findByAdoptanteOrDueno(currentUser, currentUser);
            System.out.println("Chats encontrados: " + chats.size());

            List<ChatDTO> chatDTOs = chats.stream()
                .map(chatMapper::chatToChatDTO)
                .collect(Collectors.toList());

            response.setStatusCode(200);
            response.setMessage("Chats obtenidos correctamente");
            response.setObjeto(chatDTOs); // ¡Corregido!
        } catch (OurException e) {
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al obtener los chats del usuario: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response enviarMensaje(Chat chat, Usuario emisor, Usuario receptor, String contenido) {
        Response response = new Response();
        try {
            Mensaje mensaje = new Mensaje();
            mensaje.setChat(chat);
            mensaje.setEmisor(emisor);
            mensaje.setReceptor(receptor);
            mensaje.setContenido(contenido);
            mensajeRepositorio.save(mensaje);

            response.setStatusCode(200);
            response.setMessage("Mensaje enviado correctamente");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al enviar mensaje: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response obtenerMensajes(Chat chat) {
        Response response = new Response();
        try {
            List<Mensaje> mensajes = mensajeRepositorio.findByChat(chat);

            List<MensajeDTO> mensajesDTO = mensajes.stream()
                .map(chatMapper::mensajeToMensajeDTO)
                .collect(Collectors.toList());

            response.setStatusCode(200);
            response.setMessage("Mensajes obtenidos");
            response.setObjeto(mensajesDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al obtener mensajes: " + e.getMessage());
        }
        return response;
    }
}