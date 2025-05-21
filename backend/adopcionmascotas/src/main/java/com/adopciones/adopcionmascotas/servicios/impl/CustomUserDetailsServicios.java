package com.adopciones.adopcionmascotas.servicios.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.adopciones.adopcionmascotas.excepciones.OurException;
import com.adopciones.adopcionmascotas.repositorios.UsuarioRepositorio;

@Service
public class CustomUserDetailsServicios implements UserDetailsService {
	
	@Autowired
	private UsuarioRepositorio ur;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		return ur.findByEmail(username).orElseThrow(() -> new OurException("Nombre de usuario o Email no encontrado"));
	}
}