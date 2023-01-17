package org.crestemong.backend.service;

import com.auth0.jwt.JWT;
import org.crestemong.backend.config.filter.SecurityConstants;

import java.time.OffsetDateTime;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public final class TokenService {

    public static String generateAccessToken(Long id) {
        return generateToken(id, SecurityConstants.ACCESS_TOKEN_EXPIRATION_TIME);
    }

    public static String generateRefreshToken(Long id) {
        return generateToken(id, SecurityConstants.REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public static Long getIdFromToken(String token) {
        return Long.parseLong(
                JWT.require(HMAC512(SecurityConstants.TOKEN_SECRET.getBytes()))
                        .build()
                        .verify(token)
                        .getSubject()
        );
    }

    public static boolean isValid(String token) {
        try {
            getIdFromToken(token);
            return true;
        } catch (Throwable throwable) {
            return false;
        }
    }

    private static String generateToken(Long id, long tokenExpirationTime) {
        if (id != null) {
            final OffsetDateTime offsetDateTime = OffsetDateTime.now().plusSeconds(tokenExpirationTime);
            final Date expiresAt = AppTimeService.toDate(offsetDateTime);
            return JWT.create()
                    .withSubject(id.toString())
                    .withExpiresAt(expiresAt)
                    .sign(HMAC512(SecurityConstants.TOKEN_SECRET.getBytes()));
        }
        return null;
    }
}
