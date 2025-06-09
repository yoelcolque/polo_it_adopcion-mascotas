package com.adopciones.adopcionmascotas.servicios.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

	@Autowired
	private CloudinaryServicio cloudinaryService;

	@Override
	public Response createPet(MascotaRegistroDTO mascotaDTO, Usuario currentUser) {
		Response response = new Response();

		try {
			if (currentUser == null) {
				throw new OurException("No se pudo obtener el usuario autenticado");
			}

			// Crear la entidad desde el DTO
			Mascota mascota = mascotaMapper.mascotaRegistroDTOToMascota(mascotaDTO);
			mascota.setEstado(EstadoMascota.DISPONIBLE);
			mascota.setUsuario(currentUser);

			// Subir imagen si fue proporcionada
			if (mascotaDTO.getImagen() != null && !mascotaDTO.getImagen().isEmpty()) {
				String url = cloudinaryService.subirImagen(mascotaDTO.getImagen());
				mascota.setFotoUrl(url);
			}

			// Guardar en base de datos
			Mascota savedMascota = mascotaRepositorio.save(mascota);

			// Mapear a DTO de respuesta
			MascotaRespuestaDTO mascotaRespuestaDTO = mascotaMapper.mascotaToMascotaRespuestaDTO(savedMascota);

			// Armar respuesta
			response.setStatusCode(200);
			response.setMessage("Mascota añadida exitosamente");
			response.setMascota(mascotaRespuestaDTO);

		} catch (OurException e) {
			response.setStatusCode(400);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al añadir la mascota: " + e.getMessage());
			e.printStackTrace();
		}

		return response;
	}


	@Override
	public Response getAllPets(Usuario currentUser) {
	    Response response = new Response();
	    try {
	        List<Mascota> mascotas = mascotaRepositorio.findByUsuario(currentUser);
	        List<MascotaRespuestaDTO> mascotasDTO = mascotaMapper.mascotasToMascotaRespuestaDTOs(mascotas);

	        response.setStatusCode(200);
	        response.setMessage("Lista de mascotas del usuario obtenida exitosamente");
	        response.setMascotas(mascotasDTO);
	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setMessage("Error al obtener las mascotas del usuario: " + e.getMessage());
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

			if (updatedDTO.getImagen() != null && !updatedDTO.getImagen().isEmpty()) {
				String nuevaUrl = cloudinaryService.subirImagen(updatedDTO.getImagen());
				mascota.setFotoUrl(nuevaUrl);
			}

			mascotaRepositorio.save(mascota);

			response.setStatusCode(200);
			response.setMessage("Mascota actualizada correctamente");

		} catch (OurException e) {
			response.setStatusCode(403);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al actualizar la mascota: " + e.getMessage());
			e.printStackTrace();
		}
		return response;
	}


	public Response getPetsByUsuario(Usuario currentUser) {
		Response response = new Response();
		try {
			if (currentUser == null) {
				throw new OurException("Usuario no autenticado.");
			}

			List<Mascota> mascotas = mascotaRepositorio.findByUsuario(currentUser);
			List<MascotaRespuestaDTO> mascotasDTO = mascotaMapper.mascotasToMascotaRespuestaDTOs(mascotas);

			response.setStatusCode(200);
			response.setMessage("Mascotas del usuario obtenidas correctamente");
			response.setMascotas(mascotasDTO);
		} catch (OurException e) {
			response.setStatusCode(401);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al obtener las mascotas del usuario: " + e.getMessage());
		}
		return response;
	}

	public Response getMascotasCercanas(double lat, double lon, double distanciaKm) {
		Response response = new Response();
		try {
			List<Mascota> mascotas = mascotaRepositorio.findCercanas(lat, lon, distanciaKm);
			List<MascotaRespuestaDTO> dtos = mascotaMapper.mascotasToMascotaRespuestaDTOs(mascotas);

			response.setStatusCode(200);
			response.setMessage("Mascotas cercanas encontradas");
			response.setMascotas(dtos);
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al obtener mascotas cercanas: " + e.getMessage());
		}
		return response;
	}

	public Response getAllPublicPets() {
		Response response = new Response();
		try {
			List<Mascota> mascotas = mascotaRepositorio.findByEstado(EstadoMascota.DISPONIBLE);
			List<MascotaRespuestaDTO> mascotasDTO = mascotaMapper.mascotasToMascotaRespuestaDTOs(mascotas);

			response.setStatusCode(200);
			response.setMessage("Mascotas públicas disponibles");
			response.setMascotas(mascotasDTO);
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al obtener mascotas públicas: " + e.getMessage());
		}
		return response;
	}

}