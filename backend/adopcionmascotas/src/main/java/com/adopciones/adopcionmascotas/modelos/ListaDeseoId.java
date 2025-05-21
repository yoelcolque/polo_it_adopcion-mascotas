package com.adopciones.adopcionmascotas.modelos;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;

@Data
public class ListaDeseoId implements Serializable {

    private Long usuario;
    private Long mascota;

    public ListaDeseoId() {}

    public ListaDeseoId(Long usuario, Long mascota) {
        this.usuario = usuario;
        this.mascota = mascota;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ListaDeseoId)) return false;
        ListaDeseoId that = (ListaDeseoId) o;
        return Objects.equals(usuario, that.usuario) &&
                Objects.equals(mascota, that.mascota);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, mascota);
    }
}