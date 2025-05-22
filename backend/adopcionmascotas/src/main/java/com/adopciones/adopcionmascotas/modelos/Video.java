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
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;        // URL del video en Cloudinary
    private String publicId;   // ID público para eliminación

    @ManyToOne
    @JoinColumn(name = "mascota_id")
    private Mascota mascota;
}	