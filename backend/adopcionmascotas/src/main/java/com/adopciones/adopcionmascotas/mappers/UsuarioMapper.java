package com.adopciones.adopcionmascotas.mappers;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;

@Mapper(componentModel = "spring")
public abstract class UsuarioMapper {

	public Usuario usuarioRegistroDTOtoUsuario(UsuarioRegistroDTO dto) {
		Usuario usuario = new Usuario();
		usuario.setNombre(dto.getNombre());
		usuario.setApellido(dto.getApellido());
		usuario.setTelefono(dto.getTelefono());
		usuario.setEmail(dto.getEmail());
		usuario.setEdad(dto.getEdad());
		usuario.setContrasena(dto.getContrasena());
		usuario.setConfirmar(dto.getConfirmar());
		usuario.setDireccion(dto.getDireccion());
		usuario.setDistrito(dto.getDistrito());
		usuario.setLatitud(null);
		usuario.setLongitud(null);
		usuario.setFotoPerfil(null);
		usuario.setVerificado(false);
		usuario.setEstado(null);
		usuario.setMascotas(null);
		return usuario;
	}

	public abstract UsuarioRespuestaDTO usuarioToUsuarioRespuestaDTO(Usuario usuario);

	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	public abstract void actualizarUsuarioDesdeDTO(UsuarioUpdateDTO dto, @MappingTarget Usuario usuario);

	public abstract List<UsuarioRespuestaDTO> usuariosToUsuarioRespuestaDTOs(List<Usuario> usuarios);
}	