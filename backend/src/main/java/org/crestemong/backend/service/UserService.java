package org.crestemong.backend.service;

import org.crestemong.api.model.UserDTO;

public interface UserService extends AppService<UserDTO> {
    UserDTO findByEmail(final String email);
}
