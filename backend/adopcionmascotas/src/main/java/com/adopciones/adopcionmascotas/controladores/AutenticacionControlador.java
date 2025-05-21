package com.adopciones.adopcionmascotas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adopciones.adopcionmascotas.dtos.IniciarSesion;
import com.adopciones.adopcionmascotas.dtos.RefreshTokenSolicitud;
import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRegistroDTO;
import com.adopciones.adopcionmascotas.servicios.interfaz.IUsuarioServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AutenticacionControlador {

	@Autowired
	private IUsuarioServicio usuarioServicio;

	// Registrar nuevo usuario
	@PostMapping("/register")
	public ResponseEntity<Response> register(@Valid @RequestBody UsuarioRegistroDTO dto) {
		Response response = usuarioServicio.register(dto);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Iniciar sesión
	@PostMapping("/login")
	public ResponseEntity<Response> login(@RequestBody IniciarSesion loginRequest) {
		Response response = usuarioServicio.login(loginRequest);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

	// Renovar token
	@PostMapping("/refresh")
	public ResponseEntity<Response> refreshToken(@RequestBody RefreshTokenSolicitud refreshRequest) {
		Response response = usuarioServicio.refreshToken(refreshRequest);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}
}