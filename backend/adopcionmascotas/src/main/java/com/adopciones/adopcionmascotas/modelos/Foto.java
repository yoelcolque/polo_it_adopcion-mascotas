package com.adopciones.adopcionmascotas.modelos;

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
@Table(name = "fotos")
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;        // URL de Cloudinary
    private String publicId;   // ID de Cloudinary para eliminar la imagen

    @ManyToOne
    @JoinColumn(name = "mascota_id")
    private Mascota mascota;
}