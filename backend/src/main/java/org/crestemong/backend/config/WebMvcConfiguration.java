package org.crestemong.backend.config;

import jakarta.validation.Validation;
import org.crestemong.backend.config.validation.AppMessageInterpolator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

import static org.springframework.http.HttpMethod.*;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    private static final long MAXAGESECS = 3600;

    public WebMvcConfiguration() {
        Validation.byDefaultProvider().configure().messageInterpolator(
                new AppMessageInterpolator(
                        Validation.byDefaultProvider().configure().getDefaultMessageInterpolator())
        );
    }

    @Value("${crestemong.security.allowed-origin-patterns}")
    private List<String> allowedOriginPatterns;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(allowedOriginPatterns.toArray(new String[0]))
                .allowedMethods(GET.name(), POST.name(), PUT.name(), PATCH.name(), DELETE.name(), OPTIONS.name())
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(MAXAGESECS);
    }
}
