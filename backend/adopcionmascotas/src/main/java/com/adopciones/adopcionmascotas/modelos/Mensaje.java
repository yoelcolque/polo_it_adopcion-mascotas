package com.adopciones.adopcionmascotas.modelos;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "mensajes")
public class Mensaje {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String contenido;

	@ManyToOne
	@JoinColumn(name = "emisor_id")
	private Usuario emisor;

	@ManyToOne
	@JoinColumn(name = "receptor_id")
	private Usuario receptor;

	@ManyToOne
	@JoinColumn(name = "chat_id")
	private Chat chat;

	@CreationTimestamp
	private Date timestamp;
}