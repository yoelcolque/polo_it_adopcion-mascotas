package com.adopciones.adopcionmascotas.modelos;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
@Entity
@Table(name = "mascotas")
public class Mascota {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mascotaId;

	private String nombre;

	@Min(0)
	@Max(25)
	private int edad;

	private BigDecimal peso;
	private String pelaje;

	@Enumerated(EnumType.STRING)
	private EspecieMascota especieMascota; // PERRO, GATO

	@Enumerated(EnumType.STRING)
	private SexoMascota sexoMascota;

	@Enumerated(EnumType.STRING)
	private EstadoMascota estado; // DISPONIBLE, ADOPTADA, INACTIVA

	private String temperamento;
	private String necesidades;
	private String historialMedico;

	private Boolean vacunado;
	private Boolean esterilizado;

	private String ubicacionTexto;
	private Double latitud;
	private Double longitud;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;

	@OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Foto> fotos;

	@OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Video> videos;

	@CreationTimestamp
	@Column(updatable = false)
	private Date createdAt;

	@UpdateTimestamp
	private Date updatedAt;
}