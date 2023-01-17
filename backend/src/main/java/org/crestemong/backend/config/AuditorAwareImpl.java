package org.crestemong.backend.config;

import org.crestemong.backend.model.User;
import org.crestemong.backend.service.SecurityService;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        User currentUser = SecurityService.getCurrentUser();
        if (currentUser != null) {
            return Optional.of(currentUser.getId());
        }
        return Optional.empty();
    }
}
