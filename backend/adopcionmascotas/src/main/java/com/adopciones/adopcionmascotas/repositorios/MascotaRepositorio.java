package com.adopciones.adopcionmascotas.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopciones.adopcionmascotas.modelos.Mascota;

public interface MascotaRepositorio extends JpaRepository<Mascota, Long> {

}
