package com.adopciones.adopcionmascotas.dtos.usuarios;

import com.adopciones.adopcionmascotas.modelos.EstadoUsuario;
import java.util.List;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;

public class UsuarioRespuestaDTO {

    private Long usuarioId;
    private String nombre;
    private String apellido;
    private String telefono;

    private String email;

    private EstadoUsuario estado;
    private String direccion;
    private int edad;
    private String fotoPerfil;
    private Double latitud;
    private Double longitud;
    private List<MascotaRespuestaDTO> mascotas;

    // Getters y Setters

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EstadoUsuario getEstado() {
        return estado;
    }

    public void setEstado(EstadoUsuario estado) {
        this.estado = estado;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public List<MascotaRespuestaDTO> getMascotas() {
        return mascotas;
    }

    public void setMascotas(List<MascotaRespuestaDTO> mascotas) {
        this.mascotas = mascotas;
    }
}