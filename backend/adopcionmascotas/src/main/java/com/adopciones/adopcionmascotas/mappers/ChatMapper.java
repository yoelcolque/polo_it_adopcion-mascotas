package com.adopciones.adopcionmascotas.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.adopciones.adopcionmascotas.dtos.ChatDTO;
import com.adopciones.adopcionmascotas.dtos.MensajeDTO;
import com.adopciones.adopcionmascotas.modelos.Chat;
import com.adopciones.adopcionmascotas.modelos.Mensaje;
import com.adopciones.adopcionmascotas.modelos.Usuario;

@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, MascotaMapper.class})
public interface ChatMapper {

    ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);
    
    @Mapping(source = "adoptante", target = "adoptante")
    @Mapping(source = "dueno", target = "dueno")
    @Mapping(source = "mascota", target = "mascota")
    ChatDTO chatToChatDTO(Chat chat);
    
    @Mapping(source = "emisor", target = "emisorId", qualifiedByName = "mapUsuarioToId")
    @Mapping(source = "receptor", target = "receptorId", qualifiedByName = "mapUsuarioToId")
    @Mapping(source = "chat", target = "chatId", qualifiedByName = "mapChatToId")
    @Mapping(source = "chat", target = "mascotaId", qualifiedByName = "mapChatToMascotaId")
    MensajeDTO mensajeToMensajeDTO(Mensaje mensaje);

    @Named("mapUsuarioToId")
    default Long mapUsuarioToId(Usuario usuario) {
        return usuario != null ? usuario.getUsuarioId() : null;
    }

    @Named("mapChatToId")
    default Long mapChatToId(Chat chat) {
        return chat != null ? chat.getId() : null;
    }

    @Named("mapChatToMascotaId")
    default Long mapChatToMascotaId(Chat chat) {
        return chat != null && chat.getMascota() != null ? chat.getMascota().getMascotaId() : null;
    }
}
