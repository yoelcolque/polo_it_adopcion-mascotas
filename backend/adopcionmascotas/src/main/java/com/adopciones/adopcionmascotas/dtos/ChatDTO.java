package com.adopciones.adopcionmascotas.dtos;

import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRespuestaDTO;

import lombok.Data;

@Data
public class ChatDTO {
	private Long id;
    private UsuarioRespuestaDTO adoptante;
    private UsuarioRespuestaDTO dueno;
    private MascotaRespuestaDTO mascota;

}
