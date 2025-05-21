package com.adopciones.adopcionmascotas.modelos;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@IdClass(ListaDeseoId.class)
@Table(name = "lista_deseo")
public class ListaDeseo {

    @Id
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Id
    @ManyToOne
    @JoinColumn(name = "mascota_id")
    private Mascota mascota;

    @CreationTimestamp
    @Column(updatable = false)
    private Date fechaAgregado;
}