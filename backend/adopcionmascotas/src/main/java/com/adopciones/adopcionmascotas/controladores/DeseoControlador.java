package com.adopciones.adopcionmascotas.controladores;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.modelos.ListaDeseo;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Usuario;
import com.adopciones.adopcionmascotas.repositorios.ListaDeseoRepositorio;
import com.adopciones.adopcionmascotas.repositorios.MascotaRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.adopciones.adopcionmascotas.mappers.MascotaMapper;
import java.util.List;


@RestController
@RequestMapping("/api/deseados")
public class DeseoControlador {

    @Autowired
    private MascotaMapper mascotaMapper;

    @Autowired
    private ListaDeseoRepositorio listaDeseoRepositorio;

    @Autowired
    private MascotaRepositorio mascotaRepositorio;

    @PostMapping("/{mascotaId}")
    public ResponseEntity<Response> agregarDeseado(@PathVariable Long mascotaId,
                                                   @AuthenticationPrincipal Usuario usuario) {
        Response response = new Response();

        Mascota mascota = mascotaRepositorio.findById(mascotaId)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        if (listaDeseoRepositorio.findByUsuarioAndMascota(usuario, mascota).isPresent()) {
            response.setStatusCode(409);
            response.setMessage("La mascota ya está en la lista de deseos.");
            return ResponseEntity.status(409).body(response);
        }

        ListaDeseo deseo = new ListaDeseo();
        deseo.setUsuario(usuario);
        deseo.setMascota(mascota);

        listaDeseoRepositorio.save(deseo);
        response.setStatusCode(201);
        response.setMessage("Mascota añadida a la lista de deseos.");
        return ResponseEntity.status(201).body(response);
    }

    @DeleteMapping("/{mascotaId}")
    public ResponseEntity<Response> quitarDeseado(@PathVariable Long mascotaId,
                                                  @AuthenticationPrincipal Usuario usuario) {
        Response response = new Response();

        Mascota mascota = mascotaRepositorio.findById(mascotaId)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        listaDeseoRepositorio.findByUsuarioAndMascota(usuario, mascota)
                .ifPresent(listaDeseoRepositorio::delete);

        response.setStatusCode(200);
        response.setMessage("Mascota eliminada de la lista de deseos.");
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Response> obtenerDeseados(@AuthenticationPrincipal Usuario usuario) {
        Response response = new Response();

        var lista = listaDeseoRepositorio.findByUsuario(usuario);
        var mascotas = lista.stream().map(ListaDeseo::getMascota).toList();

        var mascotasDTO = mascotaMapper.mascotasToMascotaRespuestaDTOs(mascotas);

        response.setStatusCode(200);
        response.setMessage("Lista de mascotas deseadas obtenida");
        response.setMascotas(mascotasDTO);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Long>> obtenerIdsDeseados(@AuthenticationPrincipal Usuario usuario) {
        List<Long> ids = listaDeseoRepositorio.findByUsuario(usuario)
                .stream()
                .map(ld -> ld.getMascota().getMascotaId())
                .toList();

        return ResponseEntity.ok(ids);
    }


}

