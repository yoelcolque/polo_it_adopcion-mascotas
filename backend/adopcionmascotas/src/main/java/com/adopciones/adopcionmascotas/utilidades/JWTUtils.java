package com.adopciones.adopcionmascotas.utilidades;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTUtils {
	private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora para el Access Token
	private static final long REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60  * 24 * 7; // 7 días para el Refresh Token

	private final Key key;

	public JWTUtils() {
		this.key = generateSecretKey();
	}

	private Key generateSecretKey() {
		// Crear un SecureRandom para generar bytes aleatorios
		SecureRandom secureRandom = new SecureRandom();
		byte[] keyBytes = new byte[256];
		secureRandom.nextBytes(keyBytes);

		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateAccessToken(UserDetails userDetails) {
		return Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).signWith(key).compact();
	}

	public String generateRefreshToken(UserDetails userDetails) {
		return Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME)).signWith(key)
				.compact();
	}

	public String extractUserName(String token) {
		return extractClaims(token, Claims::getSubject);
	}

	private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {

		return claimsTFunction
				.apply(Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(token).getPayload());

	}

	public boolean isValidToken(String token, UserDetails userDetails) {
		final String username = extractUserName(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	public boolean isTokenExpired(String token) {
	    return extractClaims(token, Claims::getExpiration).before(new Date());
	}
	
	public boolean isValidRefreshToken(String token) {
        return !isTokenExpired(token);
    }
}