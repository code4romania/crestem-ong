package org.crestemong.backend.config.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.crestemong.api.model.ApiResponseDTO;
import org.crestemong.backend.model.MessageKey;
import org.crestemong.backend.service.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Component
public class FailureAuthenticationHandler extends SimpleUrlAuthenticationFailureHandler implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final MessagesService messagesService;

    @Autowired
    public FailureAuthenticationHandler(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @Override
    public void onAuthenticationFailure(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException exception)
            throws IOException {
        final ApiResponseDTO apiResponseDTO = new ApiResponseDTO();
        apiResponseDTO.setMessage(messagesService.getMessage(MessageKey.Auth.LOGIN_FAILURE));

        final PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setStatus(HttpStatus.FORBIDDEN.value());
        out.print(objectMapper.writeValueAsString(apiResponseDTO));
        out.flush();
    }
}
