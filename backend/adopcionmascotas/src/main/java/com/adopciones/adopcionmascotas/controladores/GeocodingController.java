package com.adopciones.adopcionmascotas.controladores;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adopciones.adopcionmascotas.servicios.impl.GeocodingService;

@RestController
public class GeocodingController {

    private final GeocodingService geocodingService;

    public GeocodingController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @GetMapping("/api/geocode")
    public ResponseEntity<?> obtenerCoordenadas(@RequestParam String direccion) {
        Optional<double[]> coords = geocodingService.obtenerLatLng(direccion);
        if (coords.isPresent()) {
            double[] latlng = coords.get();
            return ResponseEntity.ok().body(
                new CoordenadasResponse(latlng[0], latlng[1])
            );
        } else {
            return ResponseEntity.badRequest().body("No se pudo obtener coordenadas para esa dirección.");
        }
    }

    // Clase interna simple para la respuesta JSON
    static class CoordenadasResponse {
        public double latitud;
        public double longitud;

        public CoordenadasResponse(double lat, double lng) {
            this.latitud = lat;
            this.longitud = lng;
        }
    }
}
