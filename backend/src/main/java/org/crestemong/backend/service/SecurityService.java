package org.crestemong.backend.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.crestemong.backend.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;

public class SecurityService {
    public static User getCurrentUser() {
        User user = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final String sUser = auth == null ? null : auth.getName();

        if (sUser != null && (!sUser.equals("anonymousUser"))) {
            user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        return user;
    }

    public static Cookie getCookieFromRequest(HttpServletRequest request, String cookieName) {
        if (request != null && cookieName != null && request.getCookies() != null) {
            return Arrays.stream(request.getCookies()).filter(cookie -> cookieName.equals(cookie.getName())).findFirst().orElse(null);
        }
        return null;
    }
}
