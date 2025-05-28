package com.adopciones.adopcionmascotas.modelos;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long usuarioId;

	@NotEmpty(message = "Coloque su nombre")
	@Size(min = 3, message = "El nombre debe contener más de 3 caracteres.")
	private String nombre;

	@NotEmpty(message = "Coloque su apellido")
	@Size(min = 3, message = "El apellido debe contener más de 3 caracteres.")
	private String apellido;

	@Pattern(regexp = "^11\\d{8}$", message = "El teléfono debe comenzar con 11 y tener 10 dígitos en total.")
	private String telefono;

	@Column(nullable = false, unique = true)
	@NotEmpty(message = "Coloque su Email")
	@Email(message = "Email inválido")
	private String email;

	@NotEmpty(message = "Coloque su contraseña")
	@Size(min = 6, message = "La contraseña necesita al menos 6 caracteres.")
	@JsonIgnore
	private String contrasena;

	@Transient
	@Size(min = 6, message = "La contraseña necesita al menos 6 caracteres.")
	@JsonIgnore
	private String confirmar;

	@Enumerated(EnumType.STRING)
	private EstadoUsuario estado; // ACTIVO, INACTIVO

	@NotEmpty
	private String direccion;
	
	@NotEmpty	
	private String distrito;
	
	@Min(18)
	@Max(99)
    private int edad;

	private Double latitud; // generado con OpenCage
	private Double longitud; // generado con OpenCage

	private String fotoPerfil; // Cloudinary
	private Boolean verificado = false;

	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Mascota> mascotas;

	@CreationTimestamp
	@Column(updatable = false)
	private Date createdAt;

	@UpdateTimestamp
	private Date updatedAt;

	@PrePersist
	protected void onCreate() {
		Date currentDate = new Date();
		this.createdAt = currentDate;
		this.updatedAt = currentDate;
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	// Spring Security
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USUARIO"));
	}

	@Override
	public String getPassword() {
		return this.contrasena;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return estado == EstadoUsuario.ACTIVO;
	}
}
