package com.adopciones.adopcionmascotas.servicios.interfaz;

import com.adopciones.adopcionmascotas.dtos.Response;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaRegistroDTO;
import com.adopciones.adopcionmascotas.dtos.mascotas.MascotaUpdateDTO;
import com.adopciones.adopcionmascotas.modelos.Usuario;

public interface IMascotaServicio {

	Response createPet(MascotaRegistroDTO mascotaDTO, Usuario currentUser);

	Response getAllPets(Usuario currentUser);

	Response deletePet(Long mascotaId, Usuario currentUser);

	Response getPetById(Long mascotaId);

	Response updatePet(Long mascotaId, MascotaUpdateDTO updatedDTO, Usuario currentUser);

	Response activatePet(Long mascotaId, Usuario currentUser);
}
