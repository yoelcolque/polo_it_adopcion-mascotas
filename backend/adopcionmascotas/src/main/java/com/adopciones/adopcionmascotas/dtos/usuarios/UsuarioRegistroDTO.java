package com.adopciones.adopcionmascotas.dtos.usuarios;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UsuarioRegistroDTO {

    @NotEmpty(message = "Coloque su nombre")
    @Size(min = 3, message = "El nombre debe contener más de 3 caracteres.")
    private String nombre;

    @NotEmpty(message = "Coloque su apellido")
    @Size(min = 3, message = "El apellido debe contener más de 3 caracteres.")
    private String apellido;

    @Pattern(regexp = "^11\\d{8}$", message = "El teléfono debe comenzar con 11 y tener 10 dígitos en total.")
    private String telefono;

    @NotEmpty(message = "Coloque su Email")
    @Email(message = "Email inválido")
    private String email;

    @NotEmpty(message = "Coloque su contraseña")
    @Size(min = 6, message = "La contraseña necesita al menos 6 caracteres.")
    private String contrasena;

    @NotEmpty(message = "Confirme su contraseña")
    @Size(min = 6, message = "La confirmación necesita al menos 6 caracteres.")
    private String confirmar;

    @NotEmpty(message = "Coloque su dirección")
    private String direccion;
    
	@NotEmpty(message = "Coloque su distrito")
	private String distrito;
    
    private int edad;
    
    private MultipartFile imagen;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getConfirmar() {
        return confirmar;
    }

    public void setConfirmar(String confirmar) {
        this.confirmar = confirmar;
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

	public MultipartFile getImagen() {
		return imagen;
	}

	public void setImagen(MultipartFile imagen) {
		this.imagen = imagen;
	}

}