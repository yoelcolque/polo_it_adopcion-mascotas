package com.adopciones.adopcionmascotas.dtos.usuarios;

import com.adopciones.adopcionmascotas.modelos.EstadoUsuario;

public class UsuarioUpdateDTO {

    private String nombre;
    private String apellido;
    private String telefono;
    private EstadoUsuario estado;
    private String direccion;
    private String distrito;
    private int edad;

    // Getters y Setters

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

    public String getDistrito() {
		return distrito;
	}

	public void setDistrito(String distrito) {
		this.distrito = distrito;
	}

	public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }
}