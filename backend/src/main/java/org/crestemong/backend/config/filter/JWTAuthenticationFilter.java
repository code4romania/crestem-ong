package org.crestemong.backend.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.crestemong.api.model.UserCredentialsDTO;
import org.crestemong.backend.model.User;
import org.crestemong.backend.service.CookieService;
import org.crestemong.backend.service.TokenService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(final AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            final UserCredentialsDTO userCredentialsDTO = new ObjectMapper().readValue(request.getInputStream(), UserCredentialsDTO.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userCredentialsDTO.getEmail(),
                            userCredentialsDTO.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException, ServletException {
        final String accessToken = TokenService.generateAccessToken(((User) authResult.getPrincipal()).getId());
        final String refreshToken = TokenService.generateRefreshToken(((User) authResult.getPrincipal()).getId());
        response.addHeader(HttpHeaders.SET_COOKIE, CookieService.createAccessTokenCookie(accessToken).toString());
        response.addHeader(HttpHeaders.SET_COOKIE, CookieService.createRefreshTokenCookie(refreshToken).toString());
        super.successfulAuthentication(request, response, chain, authResult);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed)
            throws IOException, ServletException {
        response.addHeader(HttpHeaders.SET_COOKIE, CookieService.deleteAccessTokenCookie().toString());
        response.addHeader(HttpHeaders.SET_COOKIE, CookieService.deleteRefreshTokenCookie().toString());
        super.unsuccessfulAuthentication(request, response, failed);
    }
}
