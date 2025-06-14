package com.adopciones.adopcionmascotas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.repositorios.UsuarioRepositorio;
import com.adopciones.adopcionmascotas.servicios.impl.MascotaServicios;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/api/mascota")
public class MascotaControlador {

	@Autowired
	private MascotaServicios mascotaServicio;
	
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;

	@PostMapping(value = "/agregar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Response> createPet(@Valid @ModelAttribute MascotaRegistroDTO mascotaDTO,
											  @AuthenticationPrincipal Usuario currentUser) {

		Response response = mascotaServicio.createPet(mascotaDTO, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@GetMapping("/usuario")
	public ResponseEntity<Response> getMyPets(@AuthenticationPrincipal UserDetails userDetails) {
		String email = userDetails.getUsername();
		Usuario currentUser = usuarioRepositorio.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

		Response response = mascotaServicio.getPetsByUsuario(currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@GetMapping
	public ResponseEntity<Response> getAllPets(@AuthenticationPrincipal Usuario currentUser) {
		Response response = mascotaServicio.getAllPets(currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@GetMapping("/todas")
	public ResponseEntity<Response> getAllPublicPets() {
		Response response = mascotaServicio.getAllPublicPets();
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}


	@GetMapping("/{mascotaId}")
	public ResponseEntity<Response> getPetById(@PathVariable Long mascotaId) {
		Response response = mascotaServicio.getPetById(mascotaId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@PutMapping(value = "/editar/{mascotaId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Response> updatePet(@PathVariable Long mascotaId,
											  @ModelAttribute MascotaUpdateDTO mascotaDTO,
											  @AuthenticationPrincipal Usuario currentUser) {
		Response response = mascotaServicio.updatePet(mascotaId, mascotaDTO, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}


	@DeleteMapping("/{mascotaId}")
	public ResponseEntity<Response> deletePet(@PathVariable Long mascotaId,
											  @AuthenticationPrincipal Usuario currentUser) {
		Response response = mascotaServicio.deletePet(mascotaId, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@PutMapping("/activar/{id}")
	public ResponseEntity<Response> activarMascota(@PathVariable("id") Long mascotaId,
												   @AuthenticationPrincipal Usuario currentUser) {
		Response response = mascotaServicio.activatePet(mascotaId, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@GetMapping("/cercanas")
	public ResponseEntity<Response> getCercanas(
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam(defaultValue = "5") double distanciaKm) {

		Response res = mascotaServicio.getMascotasCercanas(lat, lon, distanciaKm);
		return ResponseEntity.status(res.getStatusCode()).body(res);
	}

}