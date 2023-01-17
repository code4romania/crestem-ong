package org.crestemong.backend.config.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.crestemong.api.model.ApiResponseDTO;
import org.crestemong.backend.model.MessageKey;
import org.crestemong.backend.service.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Component
public class SuccessAuthenticationHandler extends SimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper mapper = new ObjectMapper();
    private final MessagesService messagesService;

    @Autowired
    public SuccessAuthenticationHandler(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @Override
    public void onAuthenticationSuccess(final HttpServletRequest request, final HttpServletResponse response, final Authentication authResult)
            throws IOException {
        final ApiResponseDTO apiResponseDTO = new ApiResponseDTO();
        apiResponseDTO.setMessage(messagesService.getMessage(MessageKey.Auth.LOGIN_SUCCESSFUL));

        final PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        out.print(mapper.writeValueAsString(apiResponseDTO));
        out.flush();
    }
}
