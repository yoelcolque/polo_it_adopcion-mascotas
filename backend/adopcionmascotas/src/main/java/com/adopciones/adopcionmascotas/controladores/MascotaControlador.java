package com.adopciones.adopcionmascotas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.servicios.impl.MascotaServicios;

@RestController
@RequestMapping("/api/mascota")
public class MascotaControlador {

	@Autowired
	private MascotaServicios mascotaServicio;

	@PostMapping("/agregar")
	public ResponseEntity<Response> createPet(@RequestBody MascotaRegistroDTO mascotaDTO,
											  @AuthenticationPrincipal Usuario currentUser) {
		Response response = mascotaServicio.createPet(mascotaDTO, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@GetMapping("/")
	public ResponseEntity<Response> getAllPets() {
		Response response = mascotaServicio.getAllPets();
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@GetMapping("/{mascotaId}")
	public ResponseEntity<Response> getPetById(@PathVariable Long mascotaId) {
		Response response = mascotaServicio.getPetById(mascotaId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	@PutMapping("/editar/{mascotaId}")
	public ResponseEntity<Response> updatePet(@PathVariable Long mascotaId,
											  @RequestBody MascotaUpdateDTO mascotaDTO,
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
}