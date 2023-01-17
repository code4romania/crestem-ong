package org.crestemong.backend.mapper;

import org.crestemong.api.model.UserDTO;
import org.crestemong.backend.model.User;
import org.mapstruct.Mapper;

@Mapper(uses = {RoleMapper.class})
public interface UserMapper extends AppMapper<User, UserDTO> {
}
