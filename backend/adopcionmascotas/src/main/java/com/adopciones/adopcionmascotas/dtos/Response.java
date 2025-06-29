package com.adopciones.adopcionmascotas.dtos;

import java.util.List;

import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.usuarios.UsuarioRespuestaDTO;
import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mensaje;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

	private int statusCode;
	private String message;

	private Chat chat;
	private Mensaje mensaje;
	private List<Mensaje> mensajes;
	private Object objeto;
	
	@JsonProperty("accessToken")
	private String token;
	private String refreshToken;
	private String expirationTime;

	private UsuarioRespuestaDTO usuario;
	private List<UsuarioRespuestaDTO> usuarios;

	private MascotaRespuestaDTO mascota;
	private List<MascotaRespuestaDTO> mascotas;

	// Constructores
	public Response() {}

	public Response(int statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}

	// Getters y Setters
	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getExpirationTime() {
		return expirationTime;
	}

	public void setExpirationTime(String expirationTime) {
		this.expirationTime = expirationTime;
	}

	public UsuarioRespuestaDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioRespuestaDTO usuario) {
		this.usuario = usuario;
	}

	public List<UsuarioRespuestaDTO> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<UsuarioRespuestaDTO> usuarios) {
		this.usuarios = usuarios;
	}

	public MascotaRespuestaDTO getMascota() {
		return mascota;
	}

	public void setMascota(MascotaRespuestaDTO mascota) {
		this.mascota = mascota;
	}

	public List<MascotaRespuestaDTO> getMascotas() {
		return mascotas;
	}

	public void setMascotas(List<MascotaRespuestaDTO> mascotas) {
		this.mascotas = mascotas;
	}

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	public Mensaje getMensaje() {
		return mensaje;
	}

	public void setMensaje(Mensaje mensaje) {
		this.mensaje = mensaje;
	}

	public List<Mensaje> getMensajes() {
		return mensajes;
	}

	public void setMensajes(List<Mensaje> mensajes) {
		this.mensajes = mensajes;
	}

	public Object getObjeto() {
		return objeto;
	}

	public void setObjeto(Object objeto) {
		this.objeto = objeto;
	}
}	