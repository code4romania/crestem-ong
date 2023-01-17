package org.crestemong.backend.config;

import org.crestemong.backend.config.filter.JWTAuthenticationFilter;
import org.crestemong.backend.config.filter.JWTAuthorizationFilter;
import org.crestemong.backend.config.handler.FailureAuthenticationHandler;
import org.crestemong.backend.config.handler.SuccessAuthenticationHandler;
import org.crestemong.backend.repository.UserRepository;
import org.crestemong.backend.service.MessagesService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfiguration {
    private final SuccessAuthenticationHandler successAuthenticationHandler;
    private final FailureAuthenticationHandler failureAuthenticationHandler;
    private final UserRepository userRepository;
    private final MessagesService messagesService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationConfiguration authenticationConfiguration;

    public WebSecurityConfiguration(
            final SuccessAuthenticationHandler successAuthenticationHandler,
            final FailureAuthenticationHandler failureAuthenticationHandler,
            final UserRepository userRepository,
            final MessagesService messagesService,
            final UserDetailsService userDetailsService,
            final AuthenticationConfiguration authenticationConfiguration
    ) {
        this.successAuthenticationHandler = successAuthenticationHandler;
        this.failureAuthenticationHandler = failureAuthenticationHandler;
        this.userRepository = userRepository;
        this.messagesService = messagesService;
        this.userDetailsService = userDetailsService;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .authorizeHttpRequests(
                        requests -> requests
                                .requestMatchers("/v1/auth/register").permitAll()
                                .requestMatchers("/v1/auth/login").permitAll()
                                .requestMatchers("/v1/auth/logout").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .requestMatchers("/swagger-resources/**").permitAll()
                                .requestMatchers("/v3/api-docs").permitAll()
                                .requestMatchers("/webjars/**").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilter(jwtAuthorizationFilter())
                .userDetailsService(userDetailsService)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/v1/auth/logout");
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public JWTAuthenticationFilter jwtAuthenticationFilter() throws Exception {
        final JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager());
        jwtAuthenticationFilter.setFilterProcessesUrl("/v1/auth/login");
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(this.successAuthenticationHandler);
        jwtAuthenticationFilter.setAuthenticationFailureHandler(this.failureAuthenticationHandler);
        return jwtAuthenticationFilter;
    }

    public JWTAuthorizationFilter jwtAuthorizationFilter() throws Exception {
        return new JWTAuthorizationFilter(authenticationConfiguration.getAuthenticationManager(), userRepository, messagesService);
    }
}
