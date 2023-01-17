package org.crestemong.backend.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.crestemong.backend.config.filter.SecurityConstants;
import org.springframework.http.ResponseCookie;
import org.springframework.util.StringUtils;

public final class CookieService {

    public static ResponseCookie createAccessTokenCookie(String token) {
        return generateCookie(SecurityConstants.ACCESS_TOKEN_COOKIE_NAME, token, SecurityConstants.ACCESS_TOKEN_EXPIRATION_TIME);
    }

    public static ResponseCookie createRefreshTokenCookie(String token) {
        return generateCookie(SecurityConstants.REFRESH_TOKEN_COOKIE_NAME, token, SecurityConstants.REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public static ResponseCookie deleteAccessTokenCookie() {
        return generateCookie(SecurityConstants.ACCESS_TOKEN_COOKIE_NAME, 0);
    }

    public static ResponseCookie deleteRefreshTokenCookie() {
        return generateCookie(SecurityConstants.REFRESH_TOKEN_COOKIE_NAME, 0);
    }

    public static String getCookieFromRequestByName(HttpServletRequest request, String cookieName) {
        if (request != null) {
            final Cookie[] existingCookies = request.getCookies();
            if (existingCookies != null && existingCookies.length > 0 && StringUtils.hasText(cookieName)) {
                for (final Cookie currentCookie : existingCookies) {
                    if (cookieName.equals(currentCookie.getName())) {
                        return CipherService.decrypt(currentCookie.getValue());
                    }
                }
            }
        }
        return null;
    }

    private static ResponseCookie generateCookie(String cookieName, long duration) {
        return generateCookie(cookieName, null, duration);
    }

    private static ResponseCookie generateCookie(String cookieName, String rawCookieValue, long duration) {
        final String encryptedCookieValue = CipherService.encrypt(rawCookieValue);
        return ResponseCookie.from(cookieName, encryptedCookieValue)
                .httpOnly(true)
                .path("/")
                .secure(true)
                .maxAge((int) duration)
                .sameSite("None")
                .build();
    }
}
