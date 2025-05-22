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
	
	default String mapVideo(Video video) {
	    return video.getUrl();
	}

	default List<String> mapVideos(List<Video> videos) {
	    if (videos == null) return List.of();
	    return videos.stream().map(this::mapVideo).toList();
	}

	default String mapFoto(Foto foto) {
	    return foto.getUrl();
	}

	default List<String> mapFotos(List<Foto> fotos) {
	    if (fotos == null) return List.of();
	    return fotos.stream().map(this::mapFoto).toList();
	}
}