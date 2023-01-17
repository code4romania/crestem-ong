package org.crestemong.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.crestemong.api.AuthApi;
import org.crestemong.api.model.*;
import org.crestemong.backend.config.filter.SecurityConstants;
import org.crestemong.backend.controller.base.ApiV1Controller;
import org.crestemong.backend.exception.ActionAlreadyPerformedException;
import org.crestemong.backend.model.MessageKey;
import org.crestemong.backend.service.CookieService;
import org.crestemong.backend.service.TokenService;
import org.crestemong.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
public class AuthController extends ApiV1Controller implements AuthApi {
    private final HttpServletRequest httpServletRequest;
    private final HttpServletResponse httpServletResponse;

    private final UserService userService;

    @Autowired
    public AuthController(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse,
            final UserService userService
    ) {
        this.httpServletRequest = httpServletRequest;
        this.httpServletResponse = httpServletResponse;
        this.userService = userService;
    }

    @Override
    public ResponseEntity<UserSummaryDTO> getCurrentUser() {
        return null;
    }

    @Override
    public ResponseEntity<Void> loginUser(UserCredentialsDTO userCredentialsDTO) {
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> logoutUser() {
        deleteAccessAndRefreshCookiesOnResponse();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> registerUser(UserRegistrationDTO userRegistrationDTO) {
        String email = userRegistrationDTO.getEmail();
        UserDTO user = userService.findByEmail(email);
        if (user != null) {
            throw new ActionAlreadyPerformedException(MessageKey.Auth.EMAIL_ALREADY_TAKEN);
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(userRegistrationDTO.getEmail());
        userDTO.setPassword(userRegistrationDTO.getPassword());
        userDTO.setRoles(Collections.singletonList(UserRoles.USER_PARTIAL));
        userDTO = userService.save(userDTO);

        setAccessAndRefreshCookiesOnResponse(userDTO.getId());

        return ResponseEntity.ok().build();
    }

    private void setAccessAndRefreshCookiesOnResponse(Long id) {
        final String refreshToken =
                CookieService.getCookieFromRequestByName(httpServletRequest, SecurityConstants.REFRESH_TOKEN_COOKIE_NAME);
        if (refreshToken == null) {
            setRefreshCookieOnResponse(id);
        }

        final String accessToken =
                CookieService.getCookieFromRequestByName(httpServletRequest, SecurityConstants.ACCESS_TOKEN_COOKIE_NAME);
        if (accessToken == null) {
            setAccessCookieOnResponse(id);
        }
    }

    private void setAccessCookieOnResponse(Long id) {
        final String token = TokenService.generateAccessToken(id);
        final ResponseCookie accessTokenCookie = CookieService.createAccessTokenCookie(token);
        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
    }

    private void setRefreshCookieOnResponse(Long id) {
        final String token = TokenService.generateRefreshToken(id);
        final ResponseCookie refreshTokenCookie = CookieService.createRefreshTokenCookie(token);
        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
    }

    private void deleteAccessAndRefreshCookiesOnResponse() {
        final ResponseCookie accessTokenCookie = CookieService.deleteAccessTokenCookie();
        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        final ResponseCookie refreshTokenCookie = CookieService.deleteRefreshTokenCookie();
        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
    }
}
