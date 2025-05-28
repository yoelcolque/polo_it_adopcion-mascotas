package com.adopciones.adopcionmascotas.repositorios;

import java.util.List;
import java.util.Optional;

import com.adopciones.adopcionmascotas.modelos.ListaDeseo;
import com.adopciones.adopcionmascotas.modelos.ListaDeseoId;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.modelos.Mascota;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ListaDeseoRepositorio extends JpaRepository<ListaDeseo, ListaDeseoId> {
    List<ListaDeseo> findByUsuario(Usuario usuario);
    Optional<ListaDeseo> findByUsuarioAndMascota(Usuario usuario, Mascota mascota);

}
