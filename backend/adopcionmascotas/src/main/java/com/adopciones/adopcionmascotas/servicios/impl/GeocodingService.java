package com.adopciones.adopcionmascotas.servicios.impl;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeocodingService {

    private final String apiKey;
    private final RestTemplate restTemplate;

    // Inyectamos RestTemplate y la apiKey desde application.properties
    public GeocodingService(RestTemplate restTemplate,
                            @Value("${geocoding.api.key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
    }

    public Optional<double[]> obtenerLatLng(String direccion) {
        try {
            String url = "https://api.opencagedata.com/geocode/v1/json?q=" +
                         URLEncoder.encode(direccion, StandardCharsets.UTF_8) +
                         "&key=" + apiKey;

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                JsonNode results = root.path("results");
                if (results.isArray() && results.size() > 0) {
                    JsonNode geometry = results.get(0).path("geometry");
                    double lat = geometry.path("lat").asDouble();
                    double lng = geometry.path("lng").asDouble();
                    return Optional.of(new double[]{lat, lng});
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }
}
