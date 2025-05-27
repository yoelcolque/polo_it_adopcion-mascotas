package com.adopciones.adopcionmascotas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.servicios.interfaz.IUsuarioServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {

	@Autowired
	private IUsuarioServicio usuarioServicio;

	// Obtener todos los usuarios
	@GetMapping("/")
	public ResponseEntity<Response> getAllUsers() {
		Response response = usuarioServicio.getAllUsers();
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Obtener un usuario por ID
	@GetMapping("/{usuarioId}")
	public ResponseEntity<Response> getUserById(@PathVariable Long usuarioId) {
		Response response = usuarioServicio.getUserById(usuarioId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Desactivar usuario (lógico)
	@DeleteMapping("/desactivar/{usuarioId}")
	public ResponseEntity<Response> desactivarUsuario(@PathVariable Long usuarioId,
													  @AuthenticationPrincipal Usuario currentUser) {
		Response response = usuarioServicio.desactivarUsuario(usuarioId, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Eliminar usuario (físico)
	@DeleteMapping("/eliminar/{usuarioId}")
	public ResponseEntity<Response> deleteUser(@PathVariable Long usuarioId,
											   @AuthenticationPrincipal Usuario currentUser) {
		Response response = usuarioServicio.deleteUser(usuarioId, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Activar usuario
	@PutMapping("/activar/{id}")
	public ResponseEntity<Response> activarUsuario(@PathVariable("id") String usuarioId,
												   @AuthenticationPrincipal Usuario currentUser) {
		Response response = usuarioServicio.activateUser(usuarioId, currentUser);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Obtener datos personales por email
// Obtener datos personales del usuario autenticado
	@GetMapping("/me")
	public ResponseEntity<Response> getMyInfo(@AuthenticationPrincipal Usuario currentUser) {
		Response response = usuarioServicio.getMyInfo(currentUser.getEmail());
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}


	// Modificar datos del usuario
	@PutMapping("/edit/{usuarioId}")
	public ResponseEntity<Response> updateUser(@PathVariable Long usuarioId,
											   @Valid @RequestBody UsuarioUpdateDTO usuarioDTO) {
		Response response = usuarioServicio.updateUsuario(usuarioId, usuarioDTO);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}
}	