package com.adopciones.adopcionmascotas.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mensaje;

public interface MensajeRepositorio extends JpaRepository<Mensaje, Long>{
    List<Mensaje> findByChatOrderByTimestampAsc(Chat chat);
    List<Mensaje> findByChat(Chat chat);
}
