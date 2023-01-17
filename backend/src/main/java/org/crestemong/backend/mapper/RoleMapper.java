package org.crestemong.backend.mapper;

import org.crestemong.api.model.UserRoles;
import org.crestemong.backend.model.Role;
import org.crestemong.backend.repository.RoleRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public abstract class RoleMapper {
    @Autowired
    private RoleRepository roleRepository;

    public Set<Role> map(List<UserRoles> roles) {
        return roles.stream()
                .map(UserRoles::getValue)
                .map(roleRepository::findByName)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
    }

    public List<UserRoles> map(Set<Role> roles) {
        return roles.stream()
                .map(Role::getName)
                .map(UserRoles::fromValue)
                .collect(Collectors.toList());
    }
}
