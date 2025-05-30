package com.adopciones.adopcionmascotas.servicios.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.adopciones.adopcionmascotas.dtos.IniciarSesion;
import com.adopciones.adopcionmascotas.dtos.RefreshTokenSolicitud;
import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioUpdateDTO;
import com.adopciones.adopcionmascotas.excepciones.OurException;
import com.adopciones.adopcionmascotas.mappers.UsuarioMapper;
import com.adopciones.adopcionmascotas.modelos.EstadoUsuario;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.repositorios.UsuarioRepositorio;
import com.adopciones.adopcionmascotas.servicios.interfaz.IUsuarioServicio;
import com.adopciones.adopcionmascotas.utilidades.JWTUtils;

@Service
public class UsuarioServicios implements IUsuarioServicio {

	@Autowired
	private UsuarioRepositorio usuarioRepositorio;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JWTUtils jwtUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UsuarioMapper usuarioMapper;

	@Autowired
	private GeocodingService geocodingService;
	
	@Autowired
	private CloudinaryServicio cloudinaryService;
	
	@Override
	public Response register(UsuarioRegistroDTO dto) {
	    Response response = new Response();
	    try {
	        // Validar si ya existe usuario con email
	        if (usuarioRepositorio.findByEmail(dto.getEmail()).isPresent()) {
	            throw new OurException("Ya existe un usuario con ese email");
	        }

	        // Validar contraseña y confirmación
	        if (!dto.getContrasena().equals(dto.getConfirmar())) {
	            throw new OurException("La contraseña y su confirmación no coinciden");
	        }
	        
	        String urlImagen = null;
	        if (dto.getImagen() != null && !dto.getImagen().isEmpty()) {
	            urlImagen = cloudinaryService.subirImagen(dto.getImagen());
	        }

	        Usuario usuario = usuarioMapper.usuarioRegistroDTOtoUsuario(dto);
	        usuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
	        usuario.setEstado(EstadoUsuario.ACTIVO);
	        if (urlImagen != null) {
	            usuario.setFotoPerfil(urlImagen);;
	        }

	        // Obtener latitud y longitud
	        String direccionParaGeocoding = dto.getCalle() + ", " + dto.getDistrito() + ", CABA, Buenos Aires, Argentina";

	        Optional<double[]> latLng = geocodingService.obtenerLatLng(direccionParaGeocoding);
	        latLng.ifPresent(coords -> {
	            usuario.setLatitud(coords[0]);
	            usuario.setLongitud(coords[1]);
	        });

	        Usuario guardado = usuarioRepositorio.save(usuario);
	        UsuarioRespuestaDTO respuestaDTO = usuarioMapper.usuarioToUsuarioRespuestaDTO(guardado);

	        response.setStatusCode(200);
	        response.setUsuario(respuestaDTO);

	    } catch (OurException e) {
	        response.setStatusCode(400);
	        response.setMessage(e.getMessage());
	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setMessage("Ocurrió un error al registrarse: " + e.getMessage());
	    }

	    return response;
	}



	@Override
	public Response login(IniciarSesion iniciarSesion) {
		Response response = new Response();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							iniciarSesion.getEmail(),
							iniciarSesion.getContrasena()
					)
			);

			Usuario usuario = usuarioRepositorio
					.findByEmail(iniciarSesion.getEmail())
					.orElseThrow(() -> new OurException("Usuario no encontrado"));

			String accessToken  = jwtUtils.generateAccessToken(usuario); // remover rol del token
			String refreshToken = jwtUtils.generateRefreshToken(usuario);

			response.setStatusCode(200);
			response.setMessage("exitoso");
			response.setToken(accessToken);
			response.setRefreshToken(refreshToken);
			response.setExpirationTime("7 Dias");

		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Ocurrió un error en el inicio de sesión: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response refreshToken(RefreshTokenSolicitud refreshTokenRequest) {
		Response response = new Response();
		try {
			String refreshToken = refreshTokenRequest.getRefreshToken();
			if (refreshToken == null || !jwtUtils.isValidRefreshToken(refreshToken)) {
				throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token inválido o expirado");
			}

			String email = jwtUtils.extractUserName(refreshToken);
			Usuario usuario = usuarioRepositorio.findByEmail(email)
					.orElseThrow(() -> new OurException("Usuario no encontrado"));

			String nuevoAccessToken = jwtUtils.generateAccessToken(usuario);

			response.setStatusCode(200);
			response.setMessage("Access token renovado exitosamente");
			response.setToken(nuevoAccessToken);
			response.setExpirationTime("1 hora");

		} catch (OurException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		} catch (ResponseStatusException e) {
			throw e;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
					"Ocurrió un error al renovar el token: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response getAllUsers() {
		Response response = new Response();
		try {
			List<Usuario> lista = usuarioRepositorio.findAll();
			response.setStatusCode(200);
			response.setUsuarios(usuarioMapper.usuariosToUsuarioRespuestaDTOs(lista));
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al obtener todos los usuarios: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response deleteUser(Long usuarioId, @AuthenticationPrincipal Usuario currentUser) {
		Response response = new Response();
		try {
			if (!usuarioId.equals(currentUser.getUsuarioId())) {
				throw new OurException("Solo puedes eliminar tu propia cuenta");
			}

			usuarioRepositorio.deleteById(usuarioId);
			response.setStatusCode(200);
			response.setMessage("Usuario eliminado correctamente");

		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al eliminar el usuario: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response desactivarUsuario(Long usuarioId, Usuario currentUser) {
		Response response = new Response();
		try {
			Usuario usuario = usuarioRepositorio.findById(usuarioId)
					.orElseThrow(() -> new OurException("Usuario no encontrado"));

			if (!usuario.getUsuarioId().equals(currentUser.getUsuarioId())) {
				throw new OurException("No tienes permisos para desactivar este usuario");
			}

			usuario.setEstado(EstadoUsuario.INACTIVO);
			usuarioRepositorio.save(usuario);
			response.setStatusCode(200);
			response.setMessage("Usuario desactivado correctamente");
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al desactivar el usuario: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response activateUser(String usuarioId, Usuario currentUser) {
		Response response = new Response();
		try {

			Usuario usuario = usuarioRepositorio.findById(Long.valueOf(usuarioId))
					.orElseThrow(() -> new OurException("Usuario no encontrado"));

			usuario.setEstado(EstadoUsuario.ACTIVO);
			usuarioRepositorio.save(usuario);

			response.setStatusCode(200);
			response.setMessage("Usuario activado correctamente");
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al activar el usuario: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response getUserById(Long usuarioId) {
		Response response = new Response();
		try {
			Usuario usuario = usuarioRepositorio.findById(usuarioId)
					.orElseThrow(() -> new OurException("Usuario no encontrado"));
			response.setStatusCode(200);
			response.setUsuario(usuarioMapper.usuarioToUsuarioRespuestaDTO(usuario));
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al buscar el usuario: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response getMyInfo(String email) {
		Response response = new Response();
		try {
			Usuario usuario = usuarioRepositorio.findByEmail(email)
					.orElseThrow(() -> new OurException("Usuario no encontrado"));
			response.setStatusCode(200);
			response.setUsuario(usuarioMapper.usuarioToUsuarioRespuestaDTO(usuario));
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al buscar al usuario: " + e.getMessage());
		}
		return response;
	}

	@Override
	public Response updateUsuario(Long usuarioId, UsuarioUpdateDTO dto) {
		Response response = new Response();
		try {
			Usuario usuario = usuarioRepositorio.findById(usuarioId)
					.orElseThrow(() -> new OurException("Usuario no encontrado"));

			usuarioMapper.actualizarUsuarioDesdeDTO(dto, usuario);

			Usuario actualizado = usuarioRepositorio.save(usuario);
			UsuarioRespuestaDTO respuestaDTO = usuarioMapper.usuarioToUsuarioRespuestaDTO(actualizado);

			response.setStatusCode(200);
			response.setUsuario(respuestaDTO);
			response.setMessage("Usuario actualizado correctamente");
		} catch (OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al actualizar el usuario: " + e.getMessage());
		}
		return response;
	}
}