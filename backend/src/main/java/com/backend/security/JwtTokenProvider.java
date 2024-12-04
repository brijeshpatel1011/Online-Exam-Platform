package com.backend.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String jwtSecret;
    private final long jwtExpirationMs;

    public JwtTokenProvider(
            @Value("${jwt.secret}") String jwtSecret,
            @Value("${jwt.expiration}") long jwtExpirationMs) {
        this.jwtSecret = jwtSecret;
        this.jwtExpirationMs = jwtExpirationMs;
    }

    public String generateToken(String email, Long id) {
        return Jwts.builder()
                .setSubject(email)
                .claim("id", id)  // Add ID to the token
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Long getIdFromJwt(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("id", Long.class);
    }

    public String getEmailFromJwt(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            // Log error: Invalid JWT signature
            return false;
        } catch (MalformedJwtException ex) {
            // Log error: Invalid JWT token
            return false;
        } catch (ExpiredJwtException ex) {
            // Log error: Expired JWT token
            return false;
        } catch (UnsupportedJwtException ex) {
            // Log error: Unsupported JWT token
            return false;
        } catch (IllegalArgumentException ex) {
            // Log error: JWT claims string is empty
            return false;
        }
    }
}