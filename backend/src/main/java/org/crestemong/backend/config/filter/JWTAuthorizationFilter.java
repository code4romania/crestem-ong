package org.crestemong.backend.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.crestemong.api.model.ApiResponseDTO;
import org.crestemong.backend.model.MessageKey;
import org.crestemong.backend.model.User;
import org.crestemong.backend.repository.UserRepository;
import org.crestemong.backend.service.CookieService;
import org.crestemong.backend.service.MessagesService;
import org.crestemong.backend.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.PrintWriter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final UserRepository userRepository;
    private final MessagesService messagesService;

    public JWTAuthorizationFilter(
            final AuthenticationManager authenticationManager,
            final UserRepository userRepository,
            final MessagesService messagesService
    ) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.messagesService = messagesService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        final String accessToken = CookieService.getCookieFromRequestByName(request, SecurityConstants.ACCESS_TOKEN_COOKIE_NAME);

        if (StringUtils.hasText(accessToken) && TokenService.isValid(accessToken)) {
            try {
                final UsernamePasswordAuthenticationToken authentication = getAuthentication(accessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(request, response);
            } catch (AuthenticationException e) {
                onUnsuccessfulAuthentication(request, response, e);
            }
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    protected void onUnsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        final ApiResponseDTO apiResponseDTO = new ApiResponseDTO();
        apiResponseDTO.setMessage(messagesService.getMessage(MessageKey.User.NOT_FOUND));

        final PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setStatus(HttpStatus.NOT_FOUND.value());
        out.print(objectMapper.writeValueAsString(apiResponseDTO));
        out.flush();
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String accessToken) {
        Long id = TokenService.getIdFromToken(accessToken);

        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            return new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    user.getAuthorities()
            );
        }
        throw new UsernameNotFoundException("User not found");
    }
}
