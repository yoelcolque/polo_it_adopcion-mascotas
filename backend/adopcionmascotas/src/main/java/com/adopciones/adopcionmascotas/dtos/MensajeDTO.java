package com.adopciones.adopcionmascotas.dtos;

import lombok.Data;

@Data
public class MensajeDTO {
	private Long chatId;
    private Long emisorId;
    private Long receptorId;
    private String contenido;
    private Long mascotaId;
}
