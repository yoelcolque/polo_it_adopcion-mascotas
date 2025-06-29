package com.adopciones.adopcionmascotas.mappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Mascota;

@Component
public class MascotaMapper {

	public Mascota mascotaRegistroDTOToMascota(MascotaRegistroDTO dto) {
		try {
			Mascota mascota = new Mascota();
			mascota.setNombre(dto.getNombre());
			mascota.setEdad(dto.getEdad());
			mascota.setPeso(dto.getPeso());
			mascota.setPelaje(dto.getPelaje());
			mascota.setEspecieMascota(dto.getEspecieMascota());
			mascota.setSexoMascota(dto.getSexoMascota());
			mascota.setTemperamento(dto.getTemperamento());
			mascota.setNecesidades(dto.getNecesidades());
			mascota.setHistorialMedico(dto.getHistorialMedico());
			mascota.setVacunado(dto.getVacunado());
			mascota.setEsterilizado(dto.getEsterilizado());
			mascota.setUbicacionTexto(dto.getUbicacionTexto());
			mascota.setLatitud(dto.getLatitud());
			mascota.setLongitud(dto.getLongitud());
			return mascota;
		} catch (Exception e) {
			System.err.println("Error en mascotaRegistroDTOToMascota: " + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}


	public MascotaRespuestaDTO mascotaToMascotaRespuestaDTO(Mascota mascota) {
		if (mascota == null) return null;

		MascotaRespuestaDTO dto = new MascotaRespuestaDTO();
		dto.setMascotaId(mascota.getMascotaId());
		dto.setNombre(mascota.getNombre());
		dto.setEdad(mascota.getEdad());
		dto.setEspecieMascota(mascota.getEspecieMascota());
		dto.setSexoMascota(mascota.getSexoMascota());
		dto.setEstado(mascota.getEstado());
		dto.setPeso(mascota.getPeso());
		dto.setPelaje(mascota.getPelaje());
		dto.setTemperamento(mascota.getTemperamento());
		dto.setNecesidades(mascota.getNecesidades());
		dto.setHistorialMedico(mascota.getHistorialMedico());
		dto.setVacunado(mascota.getVacunado());
		dto.setEsterilizado(mascota.getEsterilizado());
		dto.setUbicacionTexto(mascota.getUbicacionTexto());
		dto.setLatitud(mascota.getLatitud());
		dto.setLongitud(mascota.getLongitud());
		dto.setImagen(mascota.getFotoUrl());
		dto.setDuenoEmail(mascota.getUsuario().getEmail());
		dto.setUsuarioId(mascota.getUsuario().getUsuarioId()); // 👈 NUEVO



		return dto;
	}

	public List<MascotaRespuestaDTO> mascotasToMascotaRespuestaDTOs(List<Mascota> mascotas) {
		return mascotas.stream()
				.map(this::mascotaToMascotaRespuestaDTO)
				.toList();
	}

	public void actualizarMascotaDesdeDTO(MascotaUpdateDTO dto, Mascota mascota) {
		if (dto.getNombre() != null) mascota.setNombre(dto.getNombre());
		if (dto.getEdad() != null) mascota.setEdad(dto.getEdad());
		if (dto.getPeso() != null) mascota.setPeso(dto.getPeso());
		if (dto.getPelaje() != null) mascota.setPelaje(dto.getPelaje());
		if (dto.getEspecieMascota() != null) mascota.setEspecieMascota(dto.getEspecieMascota());
		if (dto.getSexoMascota() != null) mascota.setSexoMascota(dto.getSexoMascota());
		if (dto.getTemperamento() != null) mascota.setTemperamento(dto.getTemperamento());
		if (dto.getNecesidades() != null) mascota.setNecesidades(dto.getNecesidades());
		if (dto.getHistorialMedico() != null) mascota.setHistorialMedico(dto.getHistorialMedico());
		if (dto.getVacunado() != null) mascota.setVacunado(dto.getVacunado());
		if (dto.getEsterilizado() != null) mascota.setEsterilizado(dto.getEsterilizado());
		if (dto.getUbicacionTexto() != null) mascota.setUbicacionTexto(dto.getUbicacionTexto());
		if (dto.getLatitud() != null) mascota.setLatitud(dto.getLatitud());
		if (dto.getLongitud() != null) mascota.setLongitud(dto.getLongitud());
	}
}
