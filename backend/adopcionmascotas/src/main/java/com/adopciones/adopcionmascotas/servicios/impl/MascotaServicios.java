package com.adopciones.adopcionmascotas.servicios.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.excepciones.OurException;
import com.adopciones.adopcionmascotas.mappers.MascotaMapper;
import com.adopciones.adopcionmascotas.modelos.EstadoMascota;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.repositorios.MascotaRepositorio;
import com.adopciones.adopcionmascotas.servicios.interfaz.IMascotaServicio;

@Service
public class MascotaServicios implements IMascotaServicio {

	@Autowired
	private MascotaRepositorio mascotaRepositorio;

	@Autowired
	private MascotaMapper mascotaMapper;

	@Override
	public Response createPet(MascotaRegistroDTO mascotaDTO, Usuario currentUser) {
		Response response = new Response();

		try {
			if (currentUser == null) {
				throw new OurException("No se pudo obtener el usuario autenticado");
			}

			Mascota mascota = mascotaMapper.mascotaRegistroDTOToMascota(mascotaDTO);
			mascota.setEstado(EstadoMascota.DISPONIBLE);
			mascota.setUsuario(currentUser);

			Mascota savedMascota = mascotaRepositorio.save(mascota);
			MascotaRespuestaDTO mascotaRespuestaDTO = mascotaMapper.mascotaToMascotaRespuestaDTO(savedMascota);

			response.setStatusCode(200);
			response.setMessage("Mascota añadida exitosamente");
			response.setMascota(mascotaRespuestaDTO);

		} catch (OurException e) {
			response.setStatusCode(400);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al añadir la mascota: " + e.getMessage());
		}

		return response;
	}

	@Override
	public Response getAllPets() {
		Response response = new Response();
		try {
			List<Mascota> mascotas = mascotaRepositorio.findAll();
			List<MascotaRespuestaDTO> mascotasDTO = mascotaMapper.mascotasToMascotaRespuestaDTOs(mascotas);

			response.setStatusCode(200);
			response.setMessage("Lista de mascotas obtenida exitosamente");
			response.setMascotas(mascotasDTO); // esto es una lista
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al obtener las mascotas: " + e.getMessage());
		}
		return response;
	}


	@Override
	public Response deletePet(Long mascotaId, Usuario currentUser) {
		Response response = new Response();
		try {
			Mascota mascota = mascotaRepositorio.findById(mascotaId)
					.orElseThrow(() -> new OurException("Mascota no encontrada con el ID: " + mascotaId));

			if (!mascota.getUsuario().getUsuarioId().equals(currentUser.getUsuarioId())) {
				throw new OurException("No tienes permisos para eliminar esta mascota");
			}

			mascota.setEstado(EstadoMascota.INACTIVA);
			mascotaRepositorio.save(mascota);

			response.setStatusCode(200);
			response.setMessage("Mascota desactivada correctamente");

		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al desactivar la mascota: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response activatePet(Long mascotaId, Usuario currentUser) {
		Response response = new Response();
		try {
			Mascota mascota = mascotaRepositorio.findById(mascotaId)
					.orElseThrow(() -> new OurException("Mascota no encontrada con el ID: " + mascotaId));

			if (!mascota.getUsuario().getUsuarioId().equals(currentUser.getUsuarioId())) {
				throw new OurException("No tienes permisos para activar esta mascota");
			}

			mascota.setEstado(EstadoMascota.DISPONIBLE);
			mascotaRepositorio.save(mascota);

			response.setStatusCode(200);
			response.setMessage("Mascota activada correctamente");
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al activar la mascota: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response getPetById(Long mascotaId) {
		Response response = new Response();
		try {
			Mascota mascota = mascotaRepositorio.findById(mascotaId)
					.orElseThrow(() -> new OurException("Mascota no encontrada con el id: " + mascotaId));
			MascotaRespuestaDTO mascotaDTO = mascotaMapper.mascotaToMascotaRespuestaDTO(mascota);
			response.setStatusCode(200);
			response.setMascota(mascotaDTO);
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al buscar la mascota: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response updatePet(Long mascotaId, MascotaUpdateDTO updatedDTO, Usuario currentUser) {
		Response response = new Response();
		try {
			Mascota mascota = mascotaRepositorio.findById(mascotaId)
					.orElseThrow(() -> new OurException("Mascota no encontrada"));

			if (!mascota.getUsuario().getUsuarioId().equals(currentUser.getUsuarioId())) {
				throw new OurException("No tenés permiso para actualizar esta mascota.");
			}

			mascotaMapper.actualizarMascotaDesdeDTO(updatedDTO, mascota);
			mascotaRepositorio.save(mascota);

			response.setStatusCode(200);
			response.setMessage("Mascota actualizada correctamente");
		} catch (OurException e) {
			response.setStatusCode(403);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al actualizar la mascota: " + e.getMessage());
		}
		return response;
	}
}