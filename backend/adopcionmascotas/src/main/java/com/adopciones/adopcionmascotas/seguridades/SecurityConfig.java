package com.adopciones.adopcionmascotas.seguridades;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.adopciones.adopcionmascotas.servicios.impl.CustomUserDetailsServicios;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {
	
	 @Autowired
	 private CustomUserDetailsServicios customUserDetailsService;
	 
	 @Autowired
	 private JWTAuthFilter jwtAuthFilter;
	 
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
	     httpSecurity
	         .csrf(AbstractHttpConfigurer::disable)
	         .cors(Customizer.withDefaults())
	         .authorizeHttpRequests(request -> request
	             // Rutas públicas (no requieren token JWT)
	             .requestMatchers(
	                 "/api/auth/register",
	                 "/api/auth/login",
	                 "/api/auth/refresh",
	                 "/api/mascota/cercanas",
	                 "/api/mascota/**",
	                 "/api/mascota"
	             ).permitAll()

	             // Rutas protegidas (requieren token JWT)
	             .requestMatchers(
	                 "/api/usuarios/me",
	                 "/api/usuarios/**",
	                 "/api/mascota/agregar",
	                 "/api/mascota/usuario",
	                 "/api/deseados/**"
	             ).authenticated()

	             // Todo lo demás también requiere autenticación
	             .anyRequest().authenticated()
	         )
	         .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	         .authenticationProvider(authenticationProvider())
	         .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	     return httpSecurity.build();
	 }

	 
	 @Bean 
	 public AuthenticationProvider authenticationProvider() {
	 	 DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
	 	 daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
		 daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
	 	 return daoAuthenticationProvider;
	 }
	 
	 @Bean
	 public PasswordEncoder passwordEncoder() {
		 return new BCryptPasswordEncoder();
	 }
	 
	 @Bean
	 public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager(); 
	 }
}