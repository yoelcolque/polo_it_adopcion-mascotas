package com.adopciones.adopcionmascotas.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRespuestaDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Foto;
import com.adopciones.adopcionmascotas.modelos.Mascota;
import com.adopciones.adopcionmascotas.modelos.Video;

@Mapper(componentModel = "spring", uses = {UsuarioMapper.class})
public interface MascotaMapper {

	MascotaRespuestaDTO mascotaToMascotaRespuestaDTO(Mascota mascota);
	List<MascotaRespuestaDTO> mascotasToMascotaRespuestaDTOs(List<Mascota> mascotas);

	Mascota mascotaRegistroDTOToMascota(MascotaRegistroDTO dto);

	void actualizarMascotaDesdeDTO(MascotaUpdateDTO dto, @MappingTarget Mascota mascota);
	
	// Método auxiliar para convertir Video -> String (url)
	default String map(Video video) {
        return video.getUrl();
    }

    default List<String> map(List<Video> videos) {
        if (videos == null) return List.of(); // Evita el NullPointerException
        return videos.stream().map(this::map).toList();
    }
    // Métodos auxiliares para fotos
    default String map(Foto foto) {
        return foto.getUrl();
    }

    default List<String> mapFotos(List<Foto> fotos) {
        if (fotos == null) return List.of(); // Evita el NullPointerException
        return fotos.stream().map(this::map).toList();
    }
}