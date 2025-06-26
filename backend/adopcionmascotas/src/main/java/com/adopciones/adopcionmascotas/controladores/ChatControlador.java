package com.adopciones.adopcionmascotas.controladores;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adopciones.adopcionmascotas.dtos.MensajeDTO;
import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.excepciones.OurException;
import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.repositorios.ChatRepositorio;
import com.adopciones.adopcionmascotas.repositorios.MascotaRepositorio;
import com.adopciones.adopcionmascotas.repositorios.UsuarioRepositorio;
import com.adopciones.adopcionmascotas.servicios.interfaz.IChatServicio;

@RestController
@RequestMapping("/api/chat")
public class ChatControlador {

    @Autowired
    private IChatServicio chatServicio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private MascotaRepositorio mascotaRepositorio;

    @Autowired
    private ChatRepositorio chatRepositorio;

    // Crear o traer un chat room, recibe IDs para adoptar, dueño y mascota
    @GetMapping("/obtener-o-crear")
    public Response obtenerOCrearChat(
            @AuthenticationPrincipal Usuario currentUser,
            @RequestParam Long duenoId,
            @RequestParam Long mascotaId
    ) {
        Response response = new Response();
        try {
            if (currentUser == null) {
                throw new OurException("Usuario no autenticado.");
            }

            Optional<Usuario> duenoOpt = usuarioRepositorio.findById(duenoId);
            if (!duenoOpt.isPresent()) {
                throw new OurException("Dueño no encontrado.");
            }

            Optional<Mascota> mascotaOpt = mascotaRepositorio.findById(mascotaId);
            if (!mascotaOpt.isPresent()) {
                throw new OurException("Mascota no encontrada.");
            }

            Usuario dueno = duenoOpt.get();
            Mascota mascota = mascotaOpt.get();

            response = chatServicio.obtenerOCrearChatRoom(currentUser, dueno, mascota);
        } catch (OurException e) {
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al obtener o crear chat: " + e.getMessage());
        }

        return response;
    }
    
    @GetMapping("/mis-chats")
    public Response obtenerMisChats(@AuthenticationPrincipal Usuario currentUser) {
        Response response = new Response();
        try {
            if (currentUser == null) {
                throw new OurException("Usuario no autenticado.");
            }

            response = chatServicio.obtenerChatsDelUsuario(currentUser);
        } catch (OurException e) {
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al obtener los chats: " + e.getMessage());
        }

        return response;
    }


    // Enviar mensaje, recibe JSON con chatId, emisorId, receptorId y contenido
    @PostMapping("/enviar")
    public ResponseEntity<Response> enviarMensaje(@RequestBody MensajeDTO mensajeDTO) {
        Response response = new Response();
        try {
            Chat chat = chatRepositorio.findById(mensajeDTO.getChatId())
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));

            Usuario emisor = usuarioRepositorio.findById(mensajeDTO.getEmisorId())
                .orElseThrow(() -> new RuntimeException("Emisor no encontrado"));

            Usuario receptor = usuarioRepositorio.findById(mensajeDTO.getReceptorId())
                .orElseThrow(() -> new RuntimeException("Receptor no encontrado"));

            response = chatServicio.enviarMensaje(chat, emisor, receptor, mensajeDTO.getContenido());
            return ResponseEntity.status(response.getStatusCode()).body(response);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // Obtener mensajes de un chat, recibe chatId como path variable
    @GetMapping("/mensajes/{chatId}")
    public ResponseEntity<Response> verMensajes(@PathVariable Long chatId) {
        Response response = new Response();
        try {
            Chat chat = chatRepositorio.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));

            response = chatServicio.obtenerMensajes(chat);
            return ResponseEntity.status(response.getStatusCode()).body(response);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}