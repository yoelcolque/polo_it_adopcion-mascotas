package com.adopciones.adopcionmascotas.servicios.interfaz;

import com.adopciones.adopcionmascotas.dtos.IniciarSesion;
import com.adopciones.adopcionmascotas.dtos.RefreshTokenSolicitud;
import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;

public interface IUsuarioServicio {

	Response register(UsuarioRegistroDTO dto);

	Response login(IniciarSesion iniciarSesion);

	Response refreshToken(RefreshTokenSolicitud refreshTokenRequest);

	Response getAllUsers();

	Response getUserById(Long usuarioId);

	Response getMyInfo(String email);

	Response updateUsuario(Long usuarioId, UsuarioUpdateDTO dto);

	Response deleteUser(Long usuarioId, Usuario currentUser);

	Response desactivarUsuario(Long usuarioId, Usuario currentUser);

	Response activateUser(String usuarioId, Usuario currentUser);
}