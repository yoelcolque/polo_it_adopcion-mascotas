package com.adopciones.adopcionmascotas.dtos.mascotas;

import java.math.BigDecimal;

import com.adopciones.adopcionmascotas.modelos.EspecieMascota;
import com.adopciones.adopcionmascotas.modelos.SexoMascota;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MascotaRegistroDTO {

    @NotBlank
    private String nombre;

    @Min(0)
    @Max(25)
    private int edad;

    private BigDecimal peso;
    private String pelaje;

    @NotNull
    private EspecieMascota especieMascota;

    @NotNull
    private SexoMascota sexoMascota;

    private String imagen;
    private String temperamento;
    private String necesidades;
    private String historialMedico;
    private Boolean vacunado;
    private Boolean esterilizado;
    private String ubicacionTexto;
    private Double latitud;
    private Double longitud;

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public BigDecimal getPeso() {
        return peso;
    }

    public void setPeso(BigDecimal peso) {
        this.peso = peso;
    }

    public String getPelaje() {
        return pelaje;
    }

    public void setPelaje(String pelaje) {
        this.pelaje = pelaje;
    }

    public EspecieMascota getEspecieMascota() {
        return especieMascota;
    }

    public void setEspecieMascota(EspecieMascota especieMascota) {
        this.especieMascota = especieMascota;
    }

    public SexoMascota getSexoMascota() {
        return sexoMascota;
    }

    public void setSexoMascota(SexoMascota sexoMascota) {
        this.sexoMascota = sexoMascota;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getTemperamento() {
        return temperamento;
    }

    public void setTemperamento(String temperamento) {
        this.temperamento = temperamento;
    }

    public String getNecesidades() {
        return necesidades;
    }

    public void setNecesidades(String necesidades) {
        this.necesidades = necesidades;
    }

    public String getHistorialMedico() {
        return historialMedico;
    }

    public void setHistorialMedico(String historialMedico) {
        this.historialMedico = historialMedico;
    }

    public Boolean getVacunado() {
        return vacunado;
    }

    public void setVacunado(Boolean vacunado) {
        this.vacunado = vacunado;
    }

    public Boolean getEsterilizado() {
        return esterilizado;
    }

    public void setEsterilizado(Boolean esterilizado) {
        this.esterilizado = esterilizado;
    }

    public String getUbicacionTexto() {
        return ubicacionTexto;
    }

    public void setUbicacionTexto(String ubicacionTexto) {
        this.ubicacionTexto = ubicacionTexto;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }
}