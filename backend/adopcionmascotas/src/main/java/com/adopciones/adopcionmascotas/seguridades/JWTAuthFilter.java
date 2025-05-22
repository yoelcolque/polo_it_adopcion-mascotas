package com.adopciones.adopcionmascotas.seguridades;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.adopciones.adopcionmascotas.servicios.impl.CustomUserDetailsServicios;
import com.adopciones.adopcionmascotas.utilidades.JWTUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private CustomUserDetailsServicios userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
                                    throws ServletException, IOException {

        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                // 1) Extraigo el username del token (sin validar userDetails aun)
                String username = jwtUtils.extractUserName(token);

                // 2) Cargo el UserDetails sólo si no hay uno ya en el context
                if (username != null && 
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                    UserDetails userDetails = userDetailsService
                                                .loadUserByUsername(username);

                    // 3) Ahora sí valido el token contra ese userDetails
                    if (jwtUtils.isValidToken(token, userDetails)) {
                        UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                userDetails, 
                                null, 
                                userDetails.getAuthorities()
                            );
                        SecurityContextHolder
                            .getContext()
                            .setAuthentication(auth);
                    }
                }

            } catch (Exception ex) {
                // opcional: loguear token inválido / expirado
            }
        }

        chain.doFilter(req, res);
    }
}