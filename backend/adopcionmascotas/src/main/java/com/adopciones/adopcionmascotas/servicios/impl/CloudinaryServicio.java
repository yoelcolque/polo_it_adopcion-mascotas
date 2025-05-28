package com.adopciones.adopcionmascotas.servicios.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
@Service
public class CloudinaryServicio {

    @Autowired
    private Cloudinary cloudinary;

    public String subirImagen(MultipartFile archivo) throws IOException {
        Map<?, ?> result = cloudinary.uploader().upload(archivo.getBytes(), Map.of());
        return (String) result.get("secure_url");
    }
}