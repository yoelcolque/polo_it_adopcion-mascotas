package com.adopciones.adopcionmascotas.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Usuario;

public interface ChatRepositorio extends JpaRepository<Chat, Long>{
    Optional<Chat> findByAdoptanteAndDuenoAndMascota(Usuario adoptante, Usuario dueno, Mascota mascota);
    List<Chat> findByAdoptanteOrDueno(Usuario adoptante, Usuario dueno);

}
