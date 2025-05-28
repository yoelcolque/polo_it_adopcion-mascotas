package com.adopciones.adopcionmascotas.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Usuario;


public interface MascotaRepositorio extends JpaRepository<Mascota, Long> {
    List<Mascota> findByUsuario(Usuario usuario);

    @Query(value = """
    SELECT *, (
        6371 * acos(
            cos(radians(:lat)) *
            cos(radians(m.latitud)) *
            cos(radians(m.longitud) - radians(:lon)) +
            sin(radians(:lat)) *
            sin(radians(m.latitud))
        )
    ) AS distancia
    FROM mascotas m
    WHERE m.estado = 'DISPONIBLE'
      AND m.latitud IS NOT NULL
      AND m.longitud IS NOT NULL
    HAVING distancia <= :distanciaKm
    ORDER BY distancia ASC
    """, nativeQuery = true)
    List<Mascota> findCercanas(
            @Param("lat") double lat,
            @Param("lon") double lon,
            @Param("distanciaKm") double distanciaKm
    );
}