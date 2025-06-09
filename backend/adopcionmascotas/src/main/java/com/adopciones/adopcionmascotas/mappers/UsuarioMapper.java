package com.adopciones.adopcionmascotas.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;

@Component
public class UsuarioMapper {

	@Autowired
	private MascotaMapper mascotaMapper;

	public Usuario usuarioRegistroDTOtoUsuario(UsuarioRegistroDTO dto) {
		Usuario usuario = new Usuario();
		usuario.setNombre(dto.getNombre());
		usuario.setApellido(dto.getApellido());
		usuario.setTelefono(dto.getTelefono());
		usuario.setEmail(dto.getEmail());
		usuario.setEdad(dto.getEdad());
		usuario.setContrasena(dto.getContrasena());
		usuario.setConfirmar(dto.getConfirmar());
		usuario.setDireccion(dto.getCalle());
		usuario.setDistrito(dto.getDistrito());
		usuario.setLatitud(null);
		usuario.setLongitud(null);
		usuario.setFotoPerfil(null);
		usuario.setVerificado(false);
		usuario.setEstado(null);
		usuario.setMascotas(null);
		return usuario;
	}

	public UsuarioRespuestaDTO usuarioToUsuarioRespuestaDTO(Usuario usuario) {
		if (usuario == null) return null;

		UsuarioRespuestaDTO dto = new UsuarioRespuestaDTO();
		dto.setUsuarioId(usuario.getUsuarioId());
		dto.setNombre(usuario.getNombre());
		dto.setApellido(usuario.getApellido());
		dto.setTelefono(usuario.getTelefono());
		dto.setEmail(usuario.getEmail());
		dto.setEstado(usuario.getEstado());
		dto.setCalle(usuario.getDireccion());
		dto.setDistrito(usuario.getDistrito());
		dto.setEdad(usuario.getEdad());
		dto.setFotoPerfil(usuario.getFotoPerfil());
		dto.setLatitud(usuario.getLatitud());
		dto.setLongitud(usuario.getLongitud());

		if (usuario.getMascotas() != null) {
			dto.setMascotas(mascotaMapper.mascotasToMascotaRespuestaDTOs(usuario.getMascotas()));
		}

		return dto;
	}

	public void actualizarUsuarioDesdeDTO(UsuarioUpdateDTO dto, Usuario usuario) {
		if (dto.getNombre() != null) usuario.setNombre(dto.getNombre());
		if (dto.getApellido() != null) usuario.setApellido(dto.getApellido());
		if (dto.getTelefono() != null) usuario.setTelefono(dto.getTelefono());
		if (dto.getEstado() != null) usuario.setEstado(dto.getEstado());
		if (dto.getDireccion() != null) usuario.setDireccion(dto.getDireccion());
		if (dto.getDistrito() != null) usuario.setDistrito(dto.getDistrito());
		if (dto.getEdad() > 0) usuario.setEdad(dto.getEdad());
	}

	public List<UsuarioRespuestaDTO> usuariosToUsuarioRespuestaDTOs(List<Usuario> usuarios) {
		return usuarios.stream()
				.map(this::usuarioToUsuarioRespuestaDTO)
				.collect(Collectors.toList());
	}
}
