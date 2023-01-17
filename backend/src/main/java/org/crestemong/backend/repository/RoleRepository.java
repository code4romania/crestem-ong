package org.crestemong.backend.repository;

import org.crestemong.backend.model.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends AppRepository<Role> {

    Role findByName(String name);
}
