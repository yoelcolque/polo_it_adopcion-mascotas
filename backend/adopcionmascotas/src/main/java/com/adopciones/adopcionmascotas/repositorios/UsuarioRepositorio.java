package com.adopciones.adopcionmascotas.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopciones.adopcionmascotas.modelos.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

	boolean existsByEmail(String email);
	
	Optional<Usuario> findByEmail(String duenoEmail);
}